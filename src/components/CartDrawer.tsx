import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "./ProductCard";
import Image from "next/image";

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
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-120 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl text-[(--p24-dark)]">Mi Pedido</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {itemCount} {itemCount === 1 ? "artículo" : "artículos"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      🛒
                    </motion.div>
                  </div>
                  <h3 className="text-lg text-[(--p24-dark)] mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-sm text-gray-500">
                    Agrega productos para comenzar tu pedido
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-[(--p24-dark)] line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-lg text-[(--p24-cyan)]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-[(--p24-dark)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-2xl text-[(--p24-dark)]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-[(--p24-cyan)] text-white rounded-lg hover:bg-[#0098d4] transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <span>Finalizar Pedido por WhatsApp</span>
                  <span className="text-xl">💬</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
