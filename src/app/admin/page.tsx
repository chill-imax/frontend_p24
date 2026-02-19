"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  ShieldAlert, 
  Lock, 
  LogIn, 
  LayoutDashboard, 
  Package, 
  LogOut,
  PlusCircle,
  Database,
  PackageCheck,
  X,
  TrendingUp,
  Tag
} from "lucide-react";

// Importamos los componentes y acciones
import ProductForm from "@/components/admin/ProductForm";
import ProductActions from "@/components/admin/ProductActions";
import { getProducts } from "@/app/actions/productActions";

export default function AdminPage() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState("");
  
  // --- ESTADOS DE LA INTERFAZ ---
  const [view, setView] = useState<"dashboard" | "inventory">("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const ADMIN_PASSPHRASE = "P24_Secure_Admin_2026";

  // Función para cargar datos (usamos useCallback para evitar re-renderizados infinitos)
  const fetchData = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Cargar sesión al montar
  useEffect(() => {
    const session = sessionStorage.getItem("p24_admin_session");
    if (session === "active") setIsAuthenticated(true);
    fetchData();
  }, [fetchData]);

  // Manejo de Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    if (password === ADMIN_PASSPHRASE) {
      setIsAuthenticated(true);
      setError("");
      sessionStorage.setItem("p24_admin_session", "active");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Contraseña incorrecta. Intento ${newAttempts} de 3.`);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setError("Acceso bloqueado por seguridad.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("p24_admin_session");
    setPassword("");
  };

  // Función específica para abrir la edición
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true); // Al poner showForm en true, el render condicional mostrará el form
  };

  // Función para cerrar el formulario y limpiar estados
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchData(); // Refrescamos la tabla para ver los cambios
  };

  // --- RENDERIZADO DE BLOQUEO POR SEGURIDAD ---
  if (isLocked) return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6 text-center">
      <div className="animate-in zoom-in duration-500">
        <ShieldAlert className="text-red-500 mx-auto mb-4" size={64} />
        <h1 className="text-2xl font-bold text-red-900 uppercase italic">Seguridad Activada</h1>
        <p className="text-red-700 mt-2 font-medium">Acceso bloqueado por múltiples intentos fallidos.</p>
      </div>
    </div>
  );

  // --- RENDERIZADO DE LOGIN ---
  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border-t-4 border-[#1DBAF5] animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
            <Lock className="text-[#1DBAF5]" size={30} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Acceso Admin</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="password"
            required
            placeholder="Contraseña Maestra"
            className={`w-full px-4 py-4 rounded-xl border ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-4 focus:ring-[#1DBAF5]/20 outline-none transition-all text-center font-bold`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-gray-950 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10">
            <LogIn size={20} /> Entrar al Sistema
          </button>
          {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* SIDEBAR FIJO */}
      <aside className="w-72 bg-gray-950 text-white p-6 flex flex-col shadow-2xl fixed h-full z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#1DBAF5] rounded-lg shadow-[0_0_15px_rgba(29,186,245,0.5)]"></div>
          <span className="text-xl font-black tracking-tighter italic">P24 CORE</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => { setView("dashboard"); setShowForm(false); setEditingProduct(null); }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${view === "dashboard" ? "bg-[#1DBAF5] text-white shadow-lg shadow-[#1DBAF5]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <LayoutDashboard size={22} /> Dashboard
          </button>
          <button 
            onClick={() => { setView("inventory"); setShowForm(false); setEditingProduct(null); }}
            className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${view === "inventory" ? "bg-[#1DBAF5] text-white shadow-lg shadow-[#1DBAF5]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Package size={22} /> Inventario
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-gray-500 hover:text-red-400 transition-colors border-t border-gray-800 font-bold">
          <LogOut size={22} /> Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-72 p-10">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
              {editingProduct ? "Editar Producto" : showForm ? "Nuevo Producto" : view === "inventory" ? "Inventario" : "Dashboard"}
            </h1>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Control Central de Papeles 24</p>
          </div>

          {(view === "inventory" && !showForm) && (
            <button 
              onClick={() => { setEditingProduct(null); setShowForm(true); }}
              className="bg-[#1DBAF5] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(29,186,245,0.3)] active:scale-95"
            >
              <PlusCircle size={22} /> AGREGAR PRODUCTO
            </button>
          )}
        </header>

        {/* VISTAS CONDICIONALES */}
        {showForm ? (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
            <ProductForm 
              initialData={editingProduct} 
              onCancel={closeForm} 
            />
          </div>
        ) : view === "dashboard" ? (
          /* VISTA DASHBOARD */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-[#1DBAF5]"><Package size={24} /></div>
                <span className="text-green-500 font-bold text-xs uppercase">Activo</span>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Productos</p>
              <h3 className="text-3xl font-black text-gray-900">{products.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-500"><Tag size={24} /></div>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">En Oferta</p>
              <h3 className="text-3xl font-black text-gray-900">
                {products.filter(p => p.isOffer).length}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-2xl text-green-500"><Database size={24} /></div>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Estado DB</p>
              <div className="flex items-center gap-2 text-green-600 font-bold mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Conectado
              </div>
            </div>
          </div>
        ) : (
          /* TABLA DE INVENTARIO */
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-visible animate-in fade-in slide-in-from-bottom-4">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Producto</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Precio</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Estado</th>
                  <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/30 transition-colors group relative hover:z-40">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={product.imageUrl} 
                            alt="" 
                            className="w-14 h-14 rounded-2xl object-cover bg-gray-100 shadow-sm border border-gray-100" 
                          />
                          {product.isOffer && (
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white p-1 rounded-lg shadow-lg">
                              <TrendingUp size={12} />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 group-hover:text-[#1DBAF5] transition-colors uppercase text-sm italic">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-gray-400 text-xs uppercase">{product.category}</td>
                    <td className="p-6">
                      {product.isOffer ? (
                        <div className="flex flex-col">
                          <span className="text-gray-300 line-through text-[10px] font-black">${Number(product.price).toFixed(2)}</span>
                          <span className="text-[#1DBAF5] font-black text-lg italic tracking-tighter">${Number(product.discountPrice).toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-black text-gray-900 text-lg italic tracking-tighter">${Number(product.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {product.inStock ? <PackageCheck size={14}/> : <X size={14}/>}
                        {product.inStock ? 'En Stock' : 'Agotado'}
                      </span>
                    </td>
                    <td className="p-6 text-right relative">
                      <ProductActions 
                        product={product} 
                        onEdit={handleEdit} 
                        onRefresh={fetchData} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && !loadingProducts && (
              <div className="p-20 text-center">
                <Package size={60} className="mx-auto mb-4 text-gray-200" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No hay productos registrados aún.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}