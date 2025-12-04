"use client";

import { useState } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";

import CustomSelect from "@/src/components/usersComponents/CustomSelect";
import DeleteUserModal from "@/src/components/usersComponents/DeleteUserModal";
import EditUserModal from "@/src/components/usersComponents/EditUserModal";

import { useDeleteModal } from "@/src/features/user/useDeleteModal";
import { useUserSearchFilter } from "@/src/features/user/useUserSearchFilter";
import { useCreateUser, useUpdateUser } from "@/src/features/user/query";

import type { User } from "@/src/types/User";
import AddUserModal from "@/src/components/usersComponents/AddUserModal";

const UsersPage = () => {

  const { users, showDeleteModal, userToDelete, handleDelete, confirmDelete, cancelDelete, } = useDeleteModal();

  const { searchTerm, setSearchTerm, filterRole, setFilterRole, filteredUsers } = useUserSearchFilter(users);

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  // Estados del modal de edición
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const openEditModal = (user: User) => {
    setUserToEdit(user);
    setShowEdit(true);
  };

  const handleCreateUser = async (data: Partial<User> & { password: string }) => {
    await createMutation.mutateAsync(data);
    setShowAddUser(false); // cerrar modal
  };
  const handleEditSubmit = async (data: Partial<User>) => {
    if (!userToEdit) return;

    await updateMutation.mutateAsync({
      id: userToEdit.id,
      data,
    });

    setShowEdit(false);
    setUserToEdit(null);
  };

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.trim().charAt(0).toUpperCase() ?? "";
    const last = lastName?.trim().charAt(0).toUpperCase() ?? "";
    return first + last;
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-[#1B473A]", // Verde institucional
      "bg-[#2E5E50]", // Verde más claro
      "bg-[#D59D31]", // Dorado institucional
      "bg-[#4F46E5]", // Indigo (editar)
      "bg-[#10B981]", // Verde éxito
      "bg-[#0EA5E9]", // Azul profesional suave
      "bg-[#9333EA]", // Morado elegante
      "bg-[#DC2626]"  // Rojo sistema
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ================= CARD 1 ================= */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 mt-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#183e33] mb-1">Users</h1>
            <p className="text-gray-600">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>

          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 bg-[#D59D31] text-white px-4 py-2 rounded-md hover:bg-[#c68c2c] transition-colors font-medium">
            <Plus size={20} />
            Add user
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B473A] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <CustomSelect value={filterRole} onChange={setFilterRole} />
          </div>
        </div>
      </div>

      {/* ================= CARD 2 ================= */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">

                {/* Avatar + name */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full ${getAvatarColor(user.firstName + user.lastName)} flex items-center justify-center text-white font-semibold`}>
                      {getInitials(user.firstName, user.lastName)}
                    </div>

                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* Job */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{user.major}</p>
                  {/* <p className="text-sm text-gray-500">{user.department}</p> */}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.role}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-3">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-[#D59D31] hover:text-[#c68c2c] flex items-center gap-1">
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900 flex items-center gap-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =============== MODAL =============== */}
      <DeleteUserModal
        isOpen={showDeleteModal}
        user={userToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      {/* MODAL PARA EDITAR */}
      {showEdit && userToEdit && (
        <EditUserModal
          user={userToEdit}
          onClose={() => setShowEdit(false)}
          onSubmit={handleEditSubmit}
        />
      )}
      {/* ADD USER MODAL */}
      <AddUserModal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UsersPage;
