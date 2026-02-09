import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-br from-gray-50 to-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[(--p24-dark)]">
              Tu aliado en oficina y personalización.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Todo en papelería, mercería e impresiones sublimadas a un clic de
              distancia.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#1DBAF5]"></div>
                Entrega rápida
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#F2119C]"></div>
                Calidad garantizada
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-[#EEF211]"></div>
                Precios competitivos
              </div>
            </div>
          </div>

          {/* Right Side - Hero Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Image
                src="/img/Taza-lasso.jpg"
                alt="Taza sublimada"
                className="w-full h-48 object-cover rounded-lg shadow-md"
                width={400} // Subimos de 48 a 400 para tener nitidez
                height={192} // h-48 en Tailwind son 192px
                quality={90}  // Opcional: aumenta la calidad del 75 (default) al 90
              />
              <Image
                src="https://i.pinimg.com/736x/d0/6f/32/d06f32af486d2b87c7920103638e6bad.jpg"
                alt="Cintas y mercería"
                className="w-full h-32 object-cover rounded-lg shadow-md"
                width={400} // Subimos de 48 a 400 para tener nitidez
                height={192} // h-48 en Tailwind son 192px
                quality={90}  // Opcional: aumenta la calidad del 75 (default) al 90
              />
            </div>
            <div className="space-y-4 pt-8">
              <Image
                src="https://abspapel.com.ve/wp-content/uploads/2024/03/P0137-RESMA-HP-OFICIO.jpg"
                alt="Resmas de papel"
                className="w-full h-32 object-cover rounded-lg shadow-md"
                width={400} // Subimos de 48 a 400 para tener nitidez
                height={192} // h-48 en Tailwind son 192px
                quality={90}  // Opcional: aumenta la calidad del 75 (default) al 90
              />
              <Image
                src="https://i.pinimg.com/1200x/e4/5b/80/e45b802366bb43c6da6635e593b5b816.jpg"
                alt="Papelería"
                className="w-full h-48 object-cover rounded-lg shadow-md"
                width={400} // Subimos de 48 a 400 para tener nitidez
                height={192} // h-48 en Tailwind son 192px
                quality={90}  // Opcional: aumenta la calidad del 75 (default) al 90
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
