"use client";
import { useState, useEffect } from "react";
import { 
  Package, 
  Tag, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle2, 
  Zap,
  Save,
  X,
  PencilLine
} from "lucide-react";
import { createProduct, updateProduct } from "@/app/actions/productActions";

interface ProductFormProps {
  initialData?: any; // Datos del producto si estamos editando
  onCancel: () => void;
}

export default function ProductForm({ initialData, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData; // Booleano para saber el modo

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    imageUrl: "",
    category: "Papelería",
    isOffer: false,
    inStock: true,
  });

  // Efecto para cargar los datos en caso de edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price?.toString() || "",
        discountPrice: initialData.discountPrice?.toString() || "",
        imageUrl: initialData.imageUrl || "",
        category: initialData.category || "Papelería",
        isOffer: initialData.isOffer || false,
        inStock: initialData.inStock ?? true,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Por favor rellena los campos obligatorios");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isEditing) {
        // Llamamos a la acción de actualizar pasándole el ID
        result = await updateProduct(initialData.id, formData);
      } else {
        // Llamamos a la acción de crear
        result = await createProduct(formData);
      }

      if (result.success) {
        alert(isEditing ? "¡Producto actualizado!" : "¡Producto creado con éxito!");
        onCancel(); 
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Error crítico al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
          {isEditing ? (
            <PencilLine className="text-[#1DBAF5]" size={28} />
          ) : (
            <Package className="text-[#1DBAF5]" size={28} />
          )}
          {isEditing ? "Modificar Producto" : "Nuevo Producto"}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre del Producto */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Nombre del Producto</label>
          <div className="relative">
            <input
              type="text"
              required
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-12 font-bold text-sm focus:ring-2 focus:ring-[#1DBAF5] transition-all"
              placeholder="Ej: Resma de Hojas Bond"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Precio Base */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Precio Base ($)</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                required
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-12 font-bold text-sm focus:ring-2 focus:ring-[#1DBAF5] transition-all"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Categoría</label>
            <div className="relative">
                <select
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-sm focus:ring-2 focus:ring-[#1DBAF5] appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                <option value="Papelería">Papelería</option>
                <option value="Impresiones">Impresiones</option>
                <option value="Sublimación">Sublimación</option>
                <option value="Mercería">Mercería</option>
                </select>
                <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* URL de Imagen */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">URL de la Imagen</label>
          <div className="relative">
            <input
              type="url"
              required
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-12 font-bold text-sm focus:ring-2 focus:ring-[#1DBAF5] transition-all"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* CONTROLES DE ESTADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-[2rem]">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <Zap size={18} className={formData.isOffer ? "text-orange-500" : "text-gray-300"} fill={formData.isOffer ? "currentColor" : "none"} />
              <span className="text-xs font-black uppercase tracking-tighter">¿Es Oferta?</span>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6 rounded-md border-gray-200 text-[#1DBAF5] focus:ring-[#1DBAF5] cursor-pointer"
              checked={formData.isOffer}
              onChange={(e) => setFormData({ ...formData, isOffer: e.target.checked })}
            />
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className={formData.inStock ? "text-green-500" : "text-gray-300"} />
              <span className="text-xs font-black uppercase tracking-tighter">Disponible</span>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6 rounded-md border-gray-200 text-[#1DBAF5] focus:ring-[#1DBAF5] cursor-pointer"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
          </div>
        </div>

        {/* Precio de Oferta */}
        {formData.isOffer && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-xs font-black uppercase tracking-widest text-orange-500 mb-2 ml-1 italic flex items-center gap-2">
              <Tag size={14} /> Precio de Oferta ($)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                required={formData.isOffer}
                className="w-full bg-orange-50 border-2 border-orange-200 rounded-2xl py-4 px-12 font-black text-[#1DBAF5] text-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="Ej: 5.99"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
              />
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gray-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-[1.5rem] hover:bg-[#1DBAF5] transition-all shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2 disabled:bg-gray-400 active:scale-95"
          >
            {loading ? (
              "Guardando..."
            ) : (
              <>
                <Save size={20} /> 
                {isEditing ? "Actualizar Producto" : "Guardar Producto"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}