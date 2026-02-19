"use server";

import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function createProduct(formData: any) {
  try {
    const product = await db.product.create({
      data: {
        name: formData.name,
        description: formData.description || "",
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        imageUrl: formData.imageUrl,
        category: formData.category,
        inStock: Boolean(formData.inStock),
        isOffer: Boolean(formData.isOffer),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/"); 
    return { success: true, product };
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { success: false, error: "No se pudo guardar el producto" };
  }
}

export async function getProducts() {
  try {
    return await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar:", error);
    return { success: false, error: "Error al eliminar" };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    // CORRECCIÓN AQUÍ: Era db.product, no db.db.product
    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || "",
        price: parseFloat(data.price),
        discountPrice: data.isOffer ? parseFloat(data.discountPrice) : null,
        imageUrl: data.imageUrl,
        category: data.category,
        inStock: Boolean(data.inStock),
        isOffer: Boolean(data.isOffer),
      },
    });
    
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar:", error);
    return { success: false, error: "Error al actualizar" };
  }
}