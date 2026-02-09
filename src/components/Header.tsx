import { Search, ShoppingCart } from "lucide-react";
import logo from "@/../public/logo.png";
import Image from "next/image";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  cartCount,
  onCartClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src={logo}
              alt="P24 Papeles 24"
              className="h-16 w-auto"
              width={16}
              height={16}
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Busca resmas, cintas, tazas..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[(--p24-cyan)] focus:border-transparent bg-white transition-all"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-[#0098d4] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-magenta-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
