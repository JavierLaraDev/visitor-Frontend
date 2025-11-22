"use client";

import { ReactNode } from "react";
import { useDashboard } from "@/src/hooks/useDashboard";
import Loader from "@/src/components/dashboardComponents/Loader";
import DashboardHeader from "@/src/components/dashboardComponents/DashboardHeader";
import Sidebar from "@/src/components/dashboardComponents/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, isSidebarOpen, setIsSidebarOpen, handleLogout, menuItems } = useDashboard();

  if (isLoading) return <Loader />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* SIDEBAR - fijo en escritorio, ocupa todo el lateral */}
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

     {/* CONTENIDO */}
<main
  className="flex-1 overflow-y-auto p-6 lg:p-10 transition-all mt-20 lg:mt-0 lg:ml-64">
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 mt-15">
    {children}
    
  </div>
</main>
    </div>
  );
}
