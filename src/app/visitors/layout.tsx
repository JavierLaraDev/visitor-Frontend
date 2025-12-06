'use client';
import Loader from '@/src/components/dashboardComponents/Loader';
import { useAuth } from '@/src/features/auth/useAuth';
import { useRouter } from 'next/navigation';
import { Children, ReactNode, useEffect } from 'react';  
import React from 'react'
import FooterVisitor from './footer';
import NavbarHeader from '@/src/components/dashboardComponents/NavbarHeader';

export default function InternLayout({ children }: { children: ReactNode }) {
    const {
        user,
        isLoading,
        handleLogout,
      } = useAuth();
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
          {/* HEADER */}
         <NavbarHeader user={user} isSidebarOpen={false} toggleSidebar={() => {}} handleLogout={handleLogout} />
    
          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 mt-20 lg:mt-0 lg:ml-64">
            {children}
          </main>
    
          {/* FOOTER */}
          <FooterVisitor />
        </div>
  )
}
