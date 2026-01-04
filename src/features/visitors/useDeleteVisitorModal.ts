import { useState } from "react";
import type { Visitor } from "@/src/types/visitor";
import { useDeleteVisitor } from "./query";

export const useDeleteVisitorModal = () => {
  const deleteMutation = useDeleteVisitor();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorToDelete, setVisitorToDelete] = useState<Visitor | null>(null);

  // abrir modal y guardar visitor seleccionado
  const handleDelete = (visitor: Visitor) => {
    setVisitorToDelete(visitor);
    setShowDeleteModal(true);
  };

  // confirmar eliminación
  const confirmDelete = async () => {
    if (!visitorToDelete) return;

    await deleteMutation.mutateAsync(visitorToDelete.id);

    setShowDeleteModal(false);
    setVisitorToDelete(null);
  };

  // cancelar
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVisitorToDelete(null);
  };

  return {
    showDeleteModal,
    visitorToDelete,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
};
