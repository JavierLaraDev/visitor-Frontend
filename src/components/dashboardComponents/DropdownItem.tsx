'use client';
import React, { useState } from 'react'
import SidebarItem from './SidebarItem';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export const DropdownItem = ({ item, onClick }:{item:any, onClick?: () => void}) => {
    const [open, setOpen]=useState(false)
    if (!item.children) {
        return <SidebarItem item={item} onClick={onClick} />;
    }
  return (
     <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold"
      >
        {item.label}
        <FaChevronDown className={`text-sm transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-4 mt-1 flex flex-col gap-1 overflow-hidden"
          >
            {item.children.map((child: any) => (
              <SidebarItem key={child.href} item={child} onClick={onClick} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
