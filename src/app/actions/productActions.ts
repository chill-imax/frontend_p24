"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        // Solo guardamos discountPrice si existe y es mayor a 0
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        imageUrl: formData.imageUrl,
        category: formData.category,
        inStock: Boolean(formData.inStock),
        isOffer: Boolean(formData.isOffer),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/"); // Para que el cliente vea el nuevo producto
    return { success: true, product };
  } catch (error) {
    console.error("Error detallado:", error);
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

// Al final de src/app/actions/productActions.ts

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al eliminar" };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        discountPrice: data.isOffer ? parseFloat(data.discountPrice) : null,
        imageUrl: data.imageUrl,
        category: data.category,
        inStock: data.inStock,
        isOffer: data.isOffer,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al actualizar" };
  }
}