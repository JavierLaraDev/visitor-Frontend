"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaUserTie, FaHome, FaChartBar, FaUserGraduate, FaUser } from "react-icons/fa";

interface SidebarItemProps {
  item: { label: string; href: string };
  onClick?: () => void;
}

export default function SidebarItem({ item, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon =
  item.label.includes("Usuario") ? FaUsers :
  item.label.includes("Visitante") ? FaUserTie :
  item.label.includes("Reporte") ? FaChartBar :
  item.label.includes("Pasante") ? FaUserGraduate :
  item.label.includes("Perfil") ? FaUser :
  FaHome;


  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
        isActive
          ? "bg-[#1B473A] text-white shadow-md scale-[1.02]"
          : "text-gray-700 hover:bg-gray-50 hover:text-[#1B473A]"
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          isActive
            ? "bg-[#D59D31]"
            : "bg-gray-100 group-hover:bg-[#D59D31] group-hover:text-white"
        }`}
      >
        <Icon
          className={`text-base ${
            isActive ? "text-white" : "text-[#1B473A] group-hover:text-white"
          }`}
        />
      </div>
      <span className="text-sm font-semibold">{item.label}</span>
    </Link>
  );
}
