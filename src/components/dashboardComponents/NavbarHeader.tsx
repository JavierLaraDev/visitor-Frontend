"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaBell, FaChevronDown, FaSearch } from "react-icons/fa";

interface HeaderProps {
  user: any;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

export default function NavbarHeader({ user, isSidebarOpen, toggleSidebar, handleLogout }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-20 
      bg-gradient-to-r from-[#1B473A] via-[#1A4237] to-[#15372E]
      border-b border-[#D59D31]/30 
      shadow-lg z-40 flex items-center justify-between px-4 lg:px-6
      backdrop-blur-sm">

      {/* LEFT SECTION: Toggle + Logo + Brand */}
      <div className="flex items-center gap-3 min-w-0 flex-1">

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2.5 rounded-lg hover:bg-[#D59D31]/20 
            text-white transition-all duration-200 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#D59D31]/50"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Logo + Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/10  border-2 border-white/20 rounded-lg blur-sm 
              group-hover:bg-[#D59D31]/30 transition-all duration-300"></div>
            <Image
              src="/LOGO.png"
              width={55}
              height={55}
              alt="Logo Facultad"
              className="relative rounded-lg opacity-95 group-hover:opacity-100 
                transition-all duration-300 group-hover:scale-105"
            />
          </div>

          <div className="hidden sm:block min-w-0">
            <h2 className="text-white bg-clip-text text-transparent font-bold text-sm lg:text-base tracking-wide uppercase truncate">
              Faculty of Engineering
            </h2>
            <p className="text-white text-xs hidden lg:block tracking-wide">
              Management System
            </p>
          </div>
        </div>
      </div>
      {/* RIGHT Search Bar */}
      <div className="hidden md:flex items-center">
        <div className="bg-[#1B473A]/50 px-4 py-1 rounded-md border border-[#D59D31]/20 
              flex items-center gap-2 w-85 backdrop-blur-sm">

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white placeholder-white/60 
               w-full focus:outline-none text-sm"
          />

          {/* Botón de búsqueda */}
          <button
            className="p-2 rounded-md hover:transition-all duration-200 active:scale-95"
            aria-label="Search"
          >
            <FaSearch className="text-white/80 hover:text-white hover:scale-110 transition-transform duration-200" size={15} />
          </button>
        </div>
      </div>




      {/* RIGHT SECTION: Notifications + User Menu */}
      <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-end">

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-lg hover:bg-[#D59D31]/20 
            text-white/80 hover:text-white transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#D59D31]/50"
          aria-label="Notificaciones"
        >
          <FaBell size={18} />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 
              bg-red-500 rounded-full border-2 border-[#1B473A]
              animate-pulse"></span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1.5 
              rounded-lg hover:bg-[#D59D31]/20 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[#D59D31]/50
              group"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 bg-white/10
                rounded-full flex items-center justify-center 
                font-bold text-white shadow-lg
                group-hover:scale-105 transition-transform duration-200
                border-2 border-white/20">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 
                bg-green-400 rounded-full border-2 border-[#1B473A]"></div>
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <p className="text-sm text-white font-semibold truncate max-w-[150px]">
                {user.email.split('@')[0]}
              </p>
            </div>

            {/* Dropdown Icon */}
            <FaChevronDown
              className={`hidden lg:block text-white/60 transition-transform duration-200
                ${isUserMenuOpen ? 'rotate-180' : ''}`}
              size={12}
            />
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg 
              shadow-xl border border-gray-200 overflow-hidden
              animate-in fade-in slide-in-from-top-2 duration-200">

              {/* User Info Mobile */}
              <div className="lg:hidden px-4 py-3 bg-gradient-to-r from-[#1B473A] to-[#15372E]">
                <p className="text-sm text-white font-semibold truncate">
                  {user.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700
                    hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FaUser className="text-gray-400" />
                  <span>Mi Perfil</span>
                </button>

                <button
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700
                    hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FaCog className="text-gray-400" />
                  <span>Configuración</span>
                </button>

                <hr className="my-1 border-gray-200" />

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600
                    hover:bg-red-50 flex items-center gap-3 transition-colors
                    font-medium"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}