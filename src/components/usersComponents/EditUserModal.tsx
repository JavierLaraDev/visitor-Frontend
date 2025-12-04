import { useEditModal } from "@/src/features/user/useEditModal";
import { User } from "@/src/types/User";

function EditUserModal({ user, onClose, onSubmit }: { user: User; onClose: () => void; onSubmit: (data: Partial<User>) => void }) {

  const { firstName, middleName, lastName, secondLastName, major, role, status, saving, setFirstName, setMiddleName, setLastName, setSecondLastName, setMajor, setRole, setStatus, handleSubmit,} = useEditModal(user, onSubmit);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#1B473A]">Editar usuario</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#1B473A] transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Input control genérico */}
          {(inputProps => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{inputProps.label}</label>
              <input
                value={inputProps.value}
                onChange={(e) => inputProps.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
              />
            </div>
          ))({
            label: "Nombres",
            value: firstName,
            onChange: setFirstName
          })}

          {(inputProps => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{inputProps.label}</label>
              <input
                value={inputProps.value}
                onChange={(e) => inputProps.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
              />
            </div>
          ))({
            label: "Segundo nombre",
            value: middleName ?? "",
            onChange: setMiddleName
          })}

          {(inputProps => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{inputProps.label}</label>
              <input
                value={inputProps.value}
                onChange={(e) => inputProps.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
              />
            </div>
          ))({
            label: "Apellido paterno",
            value: lastName,
            onChange: setLastName
          })}

          {(inputProps => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{inputProps.label}</label>
              <input
                value={inputProps.value}
                onChange={(e) => inputProps.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
              />
            </div>
          ))({
            label: "Apellido materno",
            value: secondLastName ?? "",
            onChange: setSecondLastName
          })}

          {/* Carrera */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
            >
              <option value="ADMIN">Administrator</option>
              <option value="CLIENT">Intern</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-[#1B473A]/50 focus:border-[#1B473A] transition text-gray-300"
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
              className="px-4 py-2 bg-[#D59D31] text-white rounded-lg
                         hover:bg-[#c28a2c] transition disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
