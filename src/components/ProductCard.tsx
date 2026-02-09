import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: "stock" | "offer";
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fill
        />
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs text-white ${
              product.badge === "stock"
                ? "bg-green-500"
                : "bg-[(--p24-magenta)]"
            }`}
          >
            {product.badge === "stock" ? "En Stock" : "Oferta"}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-[(--p24-dark)] line-clamp-2 min-h-12">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-[(--p24-cyan)]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[(--p24-cyan)] text-white rounded-lg hover:bg-[#0098d4] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
