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
    item.label.includes("Users") ?  FaUserTie :
      item.label.includes("Visitors") ? FaUsers :
        item.label.includes("Reporte") ? FaChartBar :
          item.label.includes("Pasante") ? FaUserGraduate :
            item.label.includes("Perfil") ? FaUser :
              FaHome;


  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg font-medium relative transition-all
    ${isActive ? "text-emerald-700" : "text-gray-700 hover:text-emerald-700"}
  `}
    >

      {/* Línea lateral */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-md transition-all
      ${isActive ? "bg-emerald-600" : "bg-transparent group-hover:bg-emerald-500"}
    `}
      />

      {/* Icono */}
      <div className="p-2 rounded-lg ">
        <Icon className={`text-base ${isActive ? "text-[#D59D31]" : "text-[#1B473A] group-hover:text-[#D59D31]"}`} />
      </div>

      <span className="text-sm font-semibold">{item.label}</span>
    </Link>

  );
}
