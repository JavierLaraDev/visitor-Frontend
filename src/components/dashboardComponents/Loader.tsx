import Image from "next/image";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">

      {/* Contenedor del spinner */}
      <div className="relative w-24 h-24 animate-pulse">
        
        {/* Anillo externo */}
        <div className="absolute inset-0 border-4 border-[#D59D31] border-t-transparent rounded-full animate-spin-slow" />

        {/* Anillo interno animado */}
        <div className="absolute inset-2 border-[3px] border-[#1B473A] border-b-transparent rounded-full animate-spin-reverse" />

        {/* Núcleo (logo/letra) */}
        <div className="absolute inset-5 bg-[#1B473A] rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white font-extrabold text-2xl tracking-wide">
            <Image
                          src="/LOGO.png"
                          width={55}
                          height={55}
                          alt="Logo Facultad"
                          className="relative rounded-lg opacity-95"
                        />
          </span>
        </div>
      </div>

      {/* Título */}
      <p className="mt-6 text-[#1B473A] font-extrabold text-xl tracking-wide animate-fade-in">
        Sistema de Administración
      </p>

      {/* Subtítulo */}
      <p className="text-gray-600 text-sm mt-1 animate-fade-in animation-delay-300">
        Cargando panel administrativo...
      </p>
    </div>
  );
}
