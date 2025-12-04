// ToastPill.tsx
import { FaCheckCircle, FaTimes, FaExclamationCircle } from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  return (
    <div className="fixed top-5 right-5 z-50 animate-slideIn">
      <div
        className={`
          px-5 py-3 rounded-full shadow-lg flex items-center gap-3
          text-white min-w-[300px] backdrop-blur-sm
          ${type === "success" ? "bg-emerald-600/90" : "bg-rose-600/90"}
        `}
      >
        <div className="text-xl flex-shrink-0">
          {type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
        </div>

        <p className="flex-1 font-medium">{message}</p>

        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
