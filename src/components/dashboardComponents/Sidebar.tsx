"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DropdownItem } from "./DropdownItem";

interface SidebarProps {
 menuItems: {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
  }[];
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({
  menuItems,
  isSidebarOpen,
  closeSidebar,
}: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col mt-20 fixed top-0 left-0 w-64 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 shadow-md z-30">
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <DropdownItem key={item.label} item={item} />
          ))}
        </nav>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-600">
          © 2025 <span className="font-bold text-[#1B473A]">Briz System</span>
          <p className="text-[10px]">Versión 1.0.0</p>
        </div>
      </aside>

      {/* Mobile */}
<AnimatePresence>
  {isSidebarOpen && (
    <>
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        exit={{ x: -250 }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed lg:hidden top-0 left-0 w-64 h-full bg-white border-r border-gray-200 shadow-xl z-40 flex flex-col"
      >

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <DropdownItem
              key={item.label}
              item={item}
              onClick={closeSidebar}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-600">
          © 2025 <span className="font-bold text-[#1B473A]">Briz System</span>
          <p className="text-[10px]">Versión 1.0.0</p>
        </div>

      </motion.aside>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
        onClick={closeSidebar}
      />
    </>
  )}
</AnimatePresence>
    </>
  );
}
