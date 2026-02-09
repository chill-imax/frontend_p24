"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ChevronDown, 
  Truck, 
  CreditCard, 
  Paintbrush, 
  MessageCircle,
  Clock
} from "lucide-react";

// Importación de tus componentes base
import TopBar from "@/components/top-bar";
import Header from "@/components/Header";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

const faqs = [
  {
    question: "¿Cómo realizo un pedido de sublimación?",
    answer: "Para pedidos personalizados (tazas, franelas, etc.), puedes enviarnos tu diseño por WhatsApp. Nosotros generamos un montaje digital para tu aprobación. Una vez confirmado el pago, procedemos con la producción.",
    icon: <Paintbrush className="text-[#1DBAF5]" size={22} />
  },
  {
    question: "¿Cuáles son las zonas de delivery?",
    answer: "Ofrecemos delivery en toda la zona metropolitana. El costo depende de la ubicación exacta. También contamos con puntos de entrega fija sin costo adicional previa coordinación.",
    icon: <Truck className="text-[#F2119C]" size={22} />
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos una amplia variedad: Pago Móvil, Transferencias bancarias (Banesco/Mercantil), Zelle y Efectivo. Los productos personalizados requieren el pago del 100% para iniciar producción.",
    icon: <CreditCard className="text-[#EEF211]" size={22} />
  },
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer: "Para artículos de papelería en stock, el despacho es inmediato o en 24h. Para servicios de sublimación y personalización, el tiempo estimado es de 2 a 3 días hábiles tras la aprobación del diseño.",
    icon: <Clock className="text-gray-400" size={22} />
  }
];

export default function FAQPage() {
  // --- Lógica de Estado (Consistente con tu App y Nosotros) ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
    const message = `Hola P24, tengo unas dudas y este es mi pedido:\n${itemsList}\nTotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegación */}
      <TopBar />
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de la página */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
              <HelpCircle className="text-[#1DBAF5]" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-[(--p24-dark)] tracking-tight">
              Preguntas Frecuentes
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Resolvemos tus dudas para que tu experiencia en Papeles 24 sea perfecta.
            </p>
          </div>

          {/* Lista de Acordeones */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                  <div className="flex items-center gap-4">
                    <span className="p-2 bg-gray-50 rounded-lg group-open:bg-blue-50 transition-colors">
                      {faq.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className="text-gray-400 transition-transform duration-300 group-open:rotate-180" 
                    size={20} 
                  />
                </summary>
                <div className="px-6 pb-6 pl-[72px]">
                  <p className="text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-4">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA de Soporte Directo */}
          <div className="mt-16 p-8 bg-white border border-dashed border-gray-300 rounded-3xl text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              ¿Aún tienes dudas?
            </h3>
            <p className="text-gray-600 mb-6">
              Escríbenos directamente y nuestro equipo te atenderá en minutos.
            </p>
            <button 
              onClick={() => window.open(`https://wa.me/584248613003`, "_blank")}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <MessageCircle size={20} />
              Hablar por WhatsApp
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#121212] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 italic">RIF: J-40743028-9</p>
          <p className="text-sm text-gray-500 mt-2">
            © 2026 Papeles 24 C.A. - Excelencia en cada detalle.
          </p>
        </div>
      </footer>

      {/* Carrito */}
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