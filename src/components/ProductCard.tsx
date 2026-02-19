"use client";
import { ShoppingCart, Tag } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null; // Nuevo: para el precio de oferta
  image: string;
  badge?: "stock" | "offer";
  category: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  // Verificamos si es una oferta válida para mostrar el precio tachado
  const isOffer = product.badge === "offer" && product.discountPrice;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        {/* Usamos img estándar para evitar errores de hostname en Next.js */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            product.inStock === false ? "grayscale opacity-50" : ""
          }`}
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 ${
              product.badge === "stock"
                ? "bg-green-500"
                : "bg-orange-500 shadow-lg" // Naranja para resaltar la oferta
            }`}
          >
            {product.badge === "offer" && <Tag size={10} fill="currentColor" />}
            {product.badge === "stock" ? "En Stock" : "Oferta"}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-[(--p24-dark)] line-clamp-2 min-h-[3rem] font-medium uppercase text-sm">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {isOffer ? (
              <>
                {/* Precio original tachado */}
                <span className="text-xs text-gray-400 line-through font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {/* Precio con descuento */}
                <span className="text-2xl font-black text-[#1DBAF5] leading-none">
                  ${product.discountPrice?.toFixed(2)}
                </span>
              </>
            ) : (
              /* Precio normal */
              <span className="text-2xl font-black text-[#1DBAF5] leading-none">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.inStock === false}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all active:scale-95 ${
              product.inStock === false
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#1DBAF5] text-white hover:bg-[#0098d4] shadow-md shadow-[#1DBAF5]/20"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-bold text-xs uppercase">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
}