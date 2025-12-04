import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/query";
import api from "../../lib/api";

export const useDashboard = () => {
  const { data: user, isLoading, error } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (error || !user)) {
      router.push("/login");
    }
  }, [user, isLoading, error]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const menuItems =
    user?.role === "ADMIN"
      ? [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users", href: "/dashboard/users" },
          { label: "Visitors", href: "/dashboard/visitors" },
        ]
      : [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Visitors", href: "/dashboard/visitors" },
      ];

  return {
    user,
    isLoading,
    menuItems,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogout,
  };
};
