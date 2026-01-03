"use client";
import type { User } from "@/src/types/User";
import { useAddUserForm } from "@/src/features/user/useAddUserForm";
import { Props } from "@/src/types/modal";

export default function AddUserModal({ isOpen, onClose, onSubmit }: Props) {
  if (!isOpen) return null;

  const { firstName, middleName, lastName, secondLastName, major, email, role, status, password, saving, setFirstName, setMiddleName, setLastName, setSecondLastName, setMajor, setEmail, setRole, setStatus, setPassword, handleSubmit} = useAddUserForm(async (data) => {
    await onSubmit(data);
    onClose(); // cerrar modal después de guardar
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-gray-200 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#1B473A]">Add user</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-[#1B473A] transition">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nombre */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Nombres *</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Segundo nombre */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Segundo nombre</label>
            <input
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            />
          </div>

          {/* Apellidos */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Apellido paterno *</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Apellido materno</label>
            <input
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            />
          </div>

          {/* Carrera */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Carrera *</label>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Correo *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Contraseña (min 9 chars) *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Rol */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Rol *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="PASANTE">PASANTE</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Estado *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#D59D31] text-white rounded-lg hover:bg-[#c28a2c] transition disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Agregar usuario"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
