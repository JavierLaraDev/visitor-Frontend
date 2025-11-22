import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import api from "../lib/api";

interface MenuGroup {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export const useDashboard = () => {
  const { data: user, isLoading, error } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Redirigir si no está logueado
  useEffect(() => {
    if (!isLoading && (error || !user)) {
      router.push("/");
    }
  }, [user, isLoading, error, router]);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // ✅ Menú dinámico según rol
  const menuItems =
    user?.role === "ADMIN"
      ? [
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Usuarios",
          children: [
            { label: "Lista", href: "/dashboard/usuarios" },
            { label: "Crear Usuario", href: "/dashboard/usuarios/crear" },
          ],
        },
        {
          label: "Visitantes",
          href: "/dashboard/visitantes",
        },
        {
          label: "Pasantes",
          href: "/dashboard/pasantes",
        },
        {
          label: "Reportes",
          children: [
            { label: "Diarios", href: "/dashboard/reportes/diarios" },
            { label: "Mensuales", href: "/dashboard/reportes/mensuales" },
            { label: "Por Pasante", href: "/dashboard/reportes/pasantes" },
          ],
        },
        {
          label: "Configuración",
          href: "/dashboard/configuracion",
        },
        {
          label: "Perfil",
          href: "/dashboard/perfil",
        },
        {
          label: "Cerrar Sesión",
          href: "/dashboard/logout",
        },
      ]
      : user?.role === "PASANTE"
        ? [
          {
            label: "Visitantes",
            children: [
              { label: "Gestionar Visitantes", href: "/dashboard/visitantes" },
            ],
          },
        ]
        : [];

  return {
    user,
    isLoading,
    error,
    menuItems,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogout,
  };
};
