"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Target, Users, Award, CheckCircle } from "lucide-react";

// Importación de tus componentes base
import TopBar from "@/components/top-bar";
import Header from "@/components/Header";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { Product } from "@/components/ProductCard";

export default function NosotrosPage() {
  // --- Lógica de Estado (Igual a tu App principal) ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Funciones del carrito
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const WHATSAPP_NUMBER = "584248613003";
    const itemsList = cart
      .map((item) => `- ${item.quantity}x ${item.name} ($${item.price.toFixed(2)})`)
      .join("\n");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Hola P24, vengo de la sección Nosotros y quiero este pedido:\n${itemsList}\nTotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- Navegación Global --- */}
      <TopBar />
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        {/* Hero Sección Nosotros */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[(--p24-dark)] tracking-tight">
                  Más que una papelería, <span className="text-[#1DBAF5]">somos tu aliado.</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  En **Papeles 24 C.A.**, entendemos que cada impresión, cada taza personalizada 
                  y cada material de oficina es parte de un proyecto más grande: el tuyo.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={20} className="text-[#F2119C]" />
                    <span>Atención personalizada en cada pedido.</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={20} className="text-[#1DBAF5]" />
                    <span>Calidad garantizada en sublimación.</span>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] w-full">
                <Image
                  src="https://i.pinimg.com/1200x/e4/5b/80/e45b802366bb43c6da6635e593b5b816.jpg"
                  alt="Instalaciones P24"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión con Iconos Lucide */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1DBAF5] transition-colors">
                  <Target className="text-[#1DBAF5] group-hover:text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Facilitar suministros de oficina y servicios de personalización con la rapidez 
                  que el mundo moderno exige.
                </p>
              </div>

              <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F2119C] transition-colors">
                  <Users className="text-[#F2119C] group-hover:text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Visión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Liderar el mercado nacional como el centro de soluciones integrales favorito 
                  por nuestra innovación y confianza.
                </p>
              </div>

              <div className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#EEF211] transition-colors">
                  <Award className="text-[#EEF211] group-hover:text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Valores</h3>
                <p className="text-gray-600 leading-relaxed">
                  Compromiso, excelencia técnica y honestidad en cada RIF: J-40743028-9.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer simple coincidente con tu Home */}
        <footer className="bg-[#121212] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">RIF: J-40743028-9</p>
            <p className="text-sm text-gray-500 mt-2">
              © 2026 Papeles 24 C.A. - Tu aliado en oficina y personalización
            </p>
          </div>
        </footer>
      </main>

      {/* --- Drawer del Carrito --- */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}