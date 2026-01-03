"use client";

import { useAddVisitorForm } from "@/src/features/visitors/useAddVisitorForm";
import { AddVisitorModalProps, Props } from "@/src/types/modal";
import { AttentionStatus, VisitorType } from "@/src/types/visitor";
export default function AddVisitorModal({ isOpen, onClose, onSubmit }: AddVisitorModalProps) {
  if (!isOpen) return null;

  const {
    firstName,
    middleName,
    lastName,
    secondLastName,
    phone,
    visitorType,
    major,
    reason,
    status,
    saving,
    error,

    setFirstName,
    setMiddleName,
    setLastName,
    setSecondLastName,
    setPhone,
    setVisitorType,
    setMajor,
    setReason,
    setStatus,

    handleSubmit,
  } = useAddVisitorForm(async (data) => {
    await onSubmit(data);
    onClose();
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-gray-200 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#1B473A]">Registrar visitante</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#1B473A] transition"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
            <label className="text-sm text-gray-700 mb-1 block">
              Segundo nombre
            </label>
            <input
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            />
          </div>

          {/* Apellido paterno */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Apellido paterno *
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Apellido materno */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Apellido materno
            </label>
            <input
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Teléfono *
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              required
            />
          </div>

          {/* Tipo visitante */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Tipo de visitante *
            </label>
            <select
              value={visitorType}
              onChange={(e) => setVisitorType(e.target.value as VisitorType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            >
              <option value="STUDENT">Estudiante</option>
              <option value="TEACHER">Docente</option>
              <option value="ADMINISTRATIVE">Administrativo</option>
              <option value="EXTERNAL">Externo</option>
            </select>
          </div>

          {/* Carrera */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Carrera
            </label>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Estado *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AttentionStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
            >
              <option value="PENDING">Pendiente</option>
              <option value="ATTENDED">Atendido</option>
            </select>
          </div>

          {/* Motivo */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-700 mb-1 block">
              Motivo de la visita *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A]"
              rows={3}
              required
            />
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
              {saving ? "Guardando..." : "Registrar visitante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
