"use client";
import { useState, useMemo } from "react";
import { Printer, Coffee, FileText, Scissors } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard, { Product } from "@/components/ProductCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

const WHATSAPP_NUMBER = "584248613003";

const categories = [
  {
    id: "papeleria",
    icon: FileText,
    title: "Papelería",
    description: "Resmas, libretas y útiles",
  },
  {
    id: "impresiones",
    icon: Printer,
    title: "Impresiones",
    description: "Servicios de impresión y toners",
  },
  {
    id: "sublimacion",
    icon: Coffee,
    title: "Sublimación",
    description: "Tazas, franelas y más",
  },

  {
    id: "merceria",
    icon: Scissors,
    title: "Mercería",
    description: "Cintas, hilos y accesorios",
  },
];

const products: Product[] = [
  {
    id: "1",
    name: "Resma de Hojas Bond Tamaño Carta",
    price: 15.0,
    image:
      "https://abspapel.com.ve/wp-content/uploads/2024/03/P0137-RESMA-HP-OFICIO.jpg",
    badge: "stock",
    category: "papeleria",
  },
  {
    id: "2",
    name: "Taza Sublimada Personalizada",
    price: 8.0,
    image:
      "https://i.pinimg.com/1200x/55/5d/33/555d337cbfc673efc982919bf6906aae.jpg",
    badge: "offer",
    category: "sublimacion",
  },
  {
    id: "3",
    name: "Set de Cintas Decorativas Variadas",
    price: 12.0,
    image:
      "https://www.lamina.com.co/cdn/shop/collections/Razo.jpg?v=1722391732",
    badge: "stock",
    category: "merceria",
  },
  {
    id: "4",
    name: "Cartucho de Tinta para Impresora",
    price: 25.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7f2BiD0vMHTYKVjTwSMaSwth-YeuVmXC0g&s",
    badge: "stock",
    category: "impresiones",
  },
  {
    id: "5",
    name: "Cuadernos",
    price: 6.5,
    image:
      "https://www.20milproductos.com/blog/wp-content/uploads/2024/05/cuadernos-corporativos-1.jpg",
    badge: "stock",
    category: "papeleria",
  },
  {
    id: "6",
    name: "Kit de Organización de Escritorio",
    price: 18.5,
    image:
      "https://i.pinimg.com/736x/88/12/71/8812717824fe91522cf77a95c7e8ba86.jpg",
    badge: "offer",
    category: "papeleria",
  },
  {
    id: "7",
    name: "Camisetas sublimadas",
    price: 22.0,
    image:
      "https://i.pinimg.com/736x/62/f7/85/62f785cb7ddb7c1a07c5ff33a0d7c602.jpg",
    badge: "stock",
    category: "sublimacion",
  },
  {
    id: "8",
    name: "Tijeras para manualidades",
    price: 14.0,
    image:
      "https://i.pinimg.com/736x/fa/18/cf/fa18cf7964b2e4ab908cc9716a8510f8.jpg",
    badge: "stock",
    category: "merceria",
  },
  {
    id: "9",
    name: "Marcadores",
    price: 9.5,
    image:
      "https://i.pinimg.com/736x/1e/02/13/1e0213aaea73a6da52a33001ec3734b7.jpg",
    badge: "stock",
    category: "papeleria",
  },
  {
    id: "10",
    name: "Taza Mágica que Cambia de Color",
    price: 12.0,
    image:
      "https://i.pinimg.com/474x/b4/79/5d/b4795d2939d3c8a9e3c2c9d2a54e0ba4.jpg",
    badge: "offer",
    category: "sublimacion",
  },
  {
    id: "11",
    name: "Stickers personalizados",
    price: 30.0,
    image:
      "https://i.pinimg.com/1200x/92/97/e1/9297e1024aa8857310e2174b41038e92.jpg",
    badge: "stock",
    category: "impresiones",
  },
  {
    id: "12",
    name: "Hilo chino",
    price: 16.0,
    image:
      "https://i.pinimg.com/1200x/eb/81/6e/eb816e1b1c59c10fefad21c0fa37587c.jpg",
    badge: "stock",
    category: "merceria",
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // Create WhatsApp message
    const itemsList = cart
      .map(
        (item) =>
          `- ${item.quantity}x ${item.name} ($${item.price.toFixed(2)})`,
      )
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const message = `Hola P24, quiero procesar este pedido:
-------------------------
${itemsList}
-------------------------
Total: $${total.toFixed(2)}

¿Me confirman disponibilidad para pagar y retirar?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <HeroSection />

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-[(--p24-dark)] mb-2">
                Explora Nuestras Categorías
              </h2>
              <p className="text-gray-600">
                Encuentra lo que necesitas de forma rápida y fácil
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-[#1DBAF5] hover:underline"
                >
                  ✕ Limpiar filtro
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-[(--p24-dark)] mb-2">
                Productos Destacados
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "producto encontrado"
                  : "productos encontrados"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No se encontraron productos con ese criterio de búsqueda
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#121212] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
            <p className="text-sm text-gray-300">RIF: J-40743028-9</p>
            <p className="text-sm text-gray-400 mt-2">
              © 2026 Papeles 24 C.A. - Tu aliado en oficina y personalización
            </p>
          </div>
        </footer>
      </main>

      {/* Cart Drawer */}
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
