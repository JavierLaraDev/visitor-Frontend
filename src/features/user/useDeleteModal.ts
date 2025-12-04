import { useState } from "react";
import type { User } from "@/src/types/User";
import { useDeleteUser, useGetUsers } from "./query";

export const useDeleteModal = () => {
  const {data:users=[],refetch}=useGetUsers();
  const deleteMutation=useDeleteUser();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDelete = (userId: number) => {
    const user = users.find((u: User) => u.id === userId);
    setUserToDelete(user ?? null);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    await deleteMutation.mutateAsync(userToDelete.id);
    refetch();
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return {
    users,
    showDeleteModal,
    userToDelete,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
};
