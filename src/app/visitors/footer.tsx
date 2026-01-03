export default function FooterVisitor() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" w-full bg-white border-t border-gray-300 shadow-inner">
      <div className="py-3 md:py-5 flex flex-col items-center gap-2">
        
        {/* Logo */}
        <img
          src="/marca-jav.png"
          alt="Javier Lara Solis"
          className="h-7 md:h-9 opacity-90 hover:opacity-100 transition-all duration-300"
        />

        {/* Texto */}
        <div className="text-center">
          <p className="text-xs md:text-xs text-gray-400">
            © {currentYear} • All Rights Reserved • Versión 1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}

