"use client";

import { useState } from "react";
import { 
  Settings, 
  Edit3, 
  Trash2, 
  ChevronDown 
} from "lucide-react";
import { deleteProduct } from "@/app/actions/productActions";

export default function ProductActions({ 
  product, 
  onEdit, 
  onRefresh 
}: { 
  product: any, 
  onEdit: (p: any) => void,
  onRefresh: () => void 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
      const result = await deleteProduct(product.id);
      if (result.success) {
        onRefresh();
      } else {
        alert("Error al eliminar el producto");
      }
    }
  };

  return (
    /* Agregamos z-index dinámico al contenedor para que cuando se abra, 
       la fila de la tabla suba de nivel */
    <div className={`relative inline-block text-left ${isOpen ? 'z-[110]' : 'z-auto'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-2xl transition-all duration-300 relative z-[111] ${
          isOpen 
            ? 'bg-gray-900 text-[#1DBAF5] shadow-lg scale-110' 
            : 'text-gray-300 hover:text-gray-900 hover:bg-gray-100 shadow-sm'
        }`}
      >
        <Settings 
          size={20} 
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[105] bg-transparent" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 z-[120] overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2">
              <button
                onClick={() => {
                  onEdit(product); // <--- ESTO PASA EL PRODUCTO AL PADRE
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-gray-700 hover:bg-blue-50 hover:text-[#1DBAF5] rounded-xl transition-all uppercase italic"
              >
                <Edit3 size={16} /> Editar
              </button>
              
              <div className="h-px bg-gray-100 my-1" />
              
              <button
                onClick={() => {
                  handleDelete();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase italic"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}