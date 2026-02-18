"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Lock, 
  LogIn, 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut,
  AlertTriangle
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState("");

  // Clave maestra (En producción usa variables de entorno: process.env.NEXT_PUBLIC_ADMIN_KEY)
  const ADMIN_PASSPHRASE = "P24_Secure_Admin_2026";

  // Efecto para persistir la sesión localmente mientras el navegador esté abierto
  useEffect(() => {
    const session = sessionStorage.getItem("p24_admin_session");
    if (session === "active") {
      setIsAuthenticated(true);
    }
  }, []);

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
        setError("Acceso bloqueado por seguridad. Recarga la página más tarde.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("p24_admin_session");
    setPassword("");
  };

  // 1. Pantalla de Bloqueo por Fuerza Bruta
  if (isLocked) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <ShieldAlert className="text-red-500 mx-auto mb-4" size={64} />
          <h1 className="text-2xl font-bold text-red-900">Seguridad Activada</h1>
          <p className="text-red-700 mt-2">Se han detectado demasiados intentos fallidos. Esta dirección IP ha sido reportada.</p>
        </div>
      </div>
    );
  }

  // 2. Pantalla de Acceso Protegida
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full transition-all border-t-4 border-[#1DBAF5]">
          <div className="text-center mb-8">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
              <Lock className="text-[#1DBAF5]" size={30} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Acceso Restringido</h1>
            <p className="text-gray-500 text-sm mt-1">Solo personal autorizado de P24</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                required
                placeholder="Contraseña Maestra"
                className={`w-full px-4 py-4 rounded-xl border ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:ring-4 focus:ring-[#1DBAF5]/20 outline-none transition-all text-center text-lg`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-xs font-semibold">
                  <AlertTriangle size={14} />
                  {error}
                </div>
              )}
            </div>
            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95">
              <LogIn size={20} />
              Verificar Identidad
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Panel Administrativo una vez verificado
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      <aside className="w-72 bg-gray-950 text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#1DBAF5] rounded-lg"></div>
          <span className="text-xl font-black tracking-tighter italic">P24 CORE</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-4 p-4 bg-[#1DBAF5]/10 text-[#1DBAF5] rounded-xl font-bold">
            <LayoutDashboard size={22} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Package size={22} /> Inventario
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 p-4 text-gray-500 hover:text-red-400 transition-colors border-t border-gray-800"
        >
          <LogOut size={22} /> Cerrar Sesión
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase">Panel de Control</h1>
            <p className="text-gray-500 font-medium">Bienvenido, Administrador de Papeles 24</p>
          </div>
        </header>

        {/* Aquí irían tus tablas de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
              <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Estatus Sistema</h4>
              <div className="flex items-center gap-2 text-green-500 font-bold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                Operativo
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}