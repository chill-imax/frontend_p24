import React from 'react';
// Importamos los iconos de Lucide
import { 
  Facebook, 
  Instagram, 
  Clock, 
  Phone 
} from 'lucide-react';

export default function TopBar() {
  return (
    <div className="w-full bg-[#f8f8f8] border-b border-gray-200 py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-[13px] text-gray-600">
          
          {/* Lado Izquierdo: Redes y Contacto */}
          <div className="flex items-center space-x-4">
            {/* Redes Sociales */}
           <div className="flex items-center space-x-3 pr-4 border-r border-gray-300">
              {/* <a href="#" className="hover:text-blue-600 transition-colors">
                <Facebook size={16} strokeWidth={2} />
              </a>
              */}
              <a href="https://www.instagram.com/papeles24c.a/" 
              target="_blank" rel="noopener noreferrer"className="hover:text-pink-600 transition-colors">
                <Instagram size={16} strokeWidth={2} />
              </a>
            </div>
            
            {/* Horario */}
            <div className="flex items-center gap-2 pr-4 border-r border-gray-300">
              <Clock size={16} className="text-gray-500" />
              <span className="uppercase font-medium tracking-tight">Horario</span>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500 fill-current" />
              <span className="font-medium">+58 412-163-2197</span>
            </div>
          </div>

          {/* Lado Derecho: Navegación Secundaria */}
          <nav>
            <ul className="flex items-center">
              <li className="px-3 border-r border-gray-300">
                <a href="/" className="font-bold text-gray-800 hover:text-[#1DBAF5] transition-colors">
                  Inicio
                </a>
              </li>
              <li className="px-3 border-r border-gray-300">
                <a href="/nosotros" className="hover:text-[#1DBAF5] transition-colors">
                  Nosotros
                </a>
              </li>
              <li className="px-3 border-r border-gray-300">
                <a href="/preguntas" className="hover:text-[#1DBAF5] transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}