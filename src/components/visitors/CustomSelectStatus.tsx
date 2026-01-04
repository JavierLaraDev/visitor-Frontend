"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AttentionStatus } from "@/src/types/visitor";
import { CustomSelectProps } from "@/src/types/modal";


export default function CustomSelectVisitorStatus({
  value,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

   const options = ["ALL", "PENDING", "ATTENDED"];

  return (
    <div className="relative w-36">
      {/* Trigger */}
      <div
        className="px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {value}
        <ChevronDown size={18} className="text-gray-500" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt); // envía valor al padre
                setOpen(false);
              }}
              className="
                px-4 py-2 cursor-pointer
                hover:bg-[#c68c2c]
                hover:text-white
              "
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
