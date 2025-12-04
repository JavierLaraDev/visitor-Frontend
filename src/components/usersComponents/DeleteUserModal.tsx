"use client";
import { DeleteUserModalProps } from "@/src/types/modal";

export default function DeleteUserModal({ isOpen, user, onConfirm, onCancel }: DeleteUserModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm ml-64 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Delete User</h2>

        <p className="text-gray-600 mb-4">
          Are you sure you want to delete{" "}
          <strong>{user?.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
