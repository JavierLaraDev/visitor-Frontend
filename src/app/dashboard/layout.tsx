"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "./footer";
import { useDashboard } from "@/src/features/dashboard/useDashboard";
import Loader from "@/src/components/dashboardComponents/Loader";
import Sidebar from "@/src/components/dashboardComponents/Sidebar";
import DashboardHeader from "@/src/components/dashboardComponents/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const {
    user,
    isLoading,
    menuItems,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogout,
  } = useDashboard();

  const router = useRouter();

  // 🔐 Si no hay sesión → redirigir a login
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user]);

  // ⏳ Mostrar loader mientras valida sesión
  if (isLoading) return <Loader />;

  // ⛔ Ocultar contenido mientras redirige
  if (!user) return null;

  // ✔ Renderizar dashboard si hay usuario
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* SIDEBAR */}
      <Sidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* HEADER */}
      <DashboardHeader
        user={user}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        handleLogout={handleLogout}
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 mt-20 lg:mt-0 lg:ml-64">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
