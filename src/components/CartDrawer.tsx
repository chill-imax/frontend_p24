"use client";
import React from "react";
import { 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  MessageCircle 
} from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  
  // Cálculo del subtotal considerando ofertas
  const subtotal = items.reduce((sum, item) => {
    const activePrice = item.badge === "offer" && item.discountPrice 
      ? item.discountPrice 
      : item.price;
    return sum + activePrice * item.quantity;
  }, 0);

  // Cálculo de cuánto se está ahorrando el cliente
  const savings = items.reduce((sum, item) => {
    if (item.badge === "offer" && item.discountPrice) {
      return sum + (item.price - item.discountPrice) * item.quantity;
    }
    return sum;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cabecera del Carrito */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-[#1DBAF5]/10 p-2 rounded-xl text-[#1DBAF5]">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-gray-900">
                Tu Pedido
              </h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-gray-50 p-8 rounded-[3rem]">
                  <ShoppingBag size={64} className="text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">El carrito está vacío</p>
                <button 
                  onClick={onClose}
                  className="text-[#1DBAF5] font-black uppercase text-xs hover:underline"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              items.map((item) => {
                const isOffer = item.badge === "offer" && item.discountPrice;
                const currentPrice = isOffer ? item.discountPrice! : item.price;

                return (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-black text-gray-900 uppercase italic line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {isOffer ? (
                            <>
                              <span className="text-xs text-gray-400 line-through">${item.price.toFixed(2)}</span>
                              <span className="text-sm font-black text-[#1DBAF5]">${currentPrice.toFixed(2)}</span>
                              <Tag size={12} className="text-orange-500" fill="currentColor" />
                            </>
                          ) : (
                            <span className="text-sm font-bold text-gray-600">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:text-[#1DBAF5] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#1DBAF5] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Resumen y Botón de Pago */}
          {items.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="space-y-2">
                {savings > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-xs font-bold uppercase tracking-widest">Tu Ahorro:</span>
                    <span className="text-sm font-black">-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Estimado:</span>
                  <span className="text-3xl font-black text-gray-900 italic tracking-tighter">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-500/20 active:scale-95"
              >
                <MessageCircle size={22} fill="currentColor" />
                Pedir por WhatsApp
              </button>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase">
                Te atenderemos personalmente para coordinar el pago
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}