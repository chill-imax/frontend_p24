"use client";
import { useState, useMemo, useEffect } from "react";
import { Printer, Coffee, FileText, Scissors, Zap } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard, { Product } from "@/components/ProductCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import TopBar from "@/components/top-bar";

// Importamos la acción de obtener productos
import { getProducts } from "@/app/actions/productActions";

const WHATSAPP_NUMBER = "584248613003";

const categories = [
  { id: "papeleria", icon: FileText, title: "Papelería", description: "Resma, libretas y útiles" },
  { id: "impresiones", icon: Printer, title: "Impresiones", description: "Servicios de impresión y toners" },
  { id: "sublimacion", icon: Coffee, title: "Sublimación", description: "Tazas, franelas y más" },
  { id: "merceria", icon: Scissors, title: "Mercería", description: "Cintas, hilos y accesorios" },
];

export default function App() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Cargar productos de MongoDB al montar el componente
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      
      // CORRECCIÓN: Mapeo con tipado estricto para Badge
      const formattedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        discountPrice: p.discountPrice,
        image: p.imageUrl,
        category: p.category.toLowerCase(),
        // Usamos 'as const' para asegurar que el valor sea del tipo literal esperado
        badge: p.isOffer ? ("offer" as const) : ("stock" as const),
        inStock: p.inStock
      }));
      
      setDbProducts(formattedProducts);
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = dbProducts;
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }
    return filtered;
  }, [searchQuery, selectedCategory, dbProducts]);

  // Lógica de Ofertas
  const offerProducts = useMemo(() => {
    return dbProducts.filter(p => p.badge === "offer");
  }, [dbProducts]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
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
    const itemsList = cart
      .map((item) => `- ${item.quantity}x ${item.name} ($${(item.discountPrice || item.price).toFixed(2)})`)
      .join("\n");

    const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

    const message = `Hola P24, quiero procesar este pedido:\n-------------------------\n${itemsList}\n-------------------------\nTotal: $${total.toFixed(2)}\n\n¿Me confirman disponibilidad?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <HeroSection />

        {/* --- SECCIÓN DE OFERTAS --- */}
        {offerProducts.length > 0 && !selectedCategory && !searchQuery && (
          <section className="py-12 bg-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-8">
                <Zap className="text-orange-500 fill-orange-500" size={24} />
                <h2 className="text-3xl font-bold text-gray-900 italic uppercase tracking-tighter">
                  Ofertas Imperdibles
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explora Nuestras Categorías</h2>
              <p className="text-gray-600">Encuentra lo que necesitas de forma rápida y fácil</p>
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
                <button onClick={() => setSelectedCategory(null)} className="text-sm text-[#1DBAF5] hover:underline">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory ? `Categoría: ${selectedCategory}` : "Productos Destacados"}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#121212] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-300">RIF: J-40743028-9</p>
            <p className="text-sm text-gray-400 mt-2">© 2026 Papeles 24 C.A. - Tu aliado en oficina y personalización</p>
          </div>
        </footer>
      </main>

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