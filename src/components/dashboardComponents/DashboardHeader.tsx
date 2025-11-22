"use client";

import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
  user: any;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

export default function DashboardHeader({ user, isSidebarOpen, toggleSidebar, handleLogout }: HeaderProps) {
  const getPageTitle = () => {
    if (typeof window === "undefined") return "";
    const path = window.location.pathname;
    if (path.includes("visitors")) return "Gestión de Visitantes";
    if (path.includes("users")) return "Gestión de Usuarios";
    return "Panel Principal";
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4 lg:px-8 shadow-sm transition-all">
      {/* Botón menú móvil */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Título */}
      <h1 className="text-lg font-bold text-[#1B473A] tracking-tight">
        {getPageTitle()}
      </h1>

      {/* Usuario */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-2 shadow-sm">
          <div className="w-8 h-8 bg-[#1B473A] rounded-full flex items-center justify-center">
            <span className="text-[#D59D31] font-bold text-sm">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user.email}
            </p>
            <p className="text-xs text-[#1B473A] font-bold uppercase">
              {user.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <FaSignOutAlt size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
