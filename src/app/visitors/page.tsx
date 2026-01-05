"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import type { Visitor } from "@/src/types/visitor";

import { useGetVisitors, useCreateVisitor, useUpdateVisitor } from "@/src/features/visitors/query";
import { useDeleteVisitorModal } from "@/src/features/visitors/useDeleteVisitorModal";
import { useVisitorSearchFilter } from "@/src/features/visitors/useVisitorSearchFilter";

import AddVisitorModal from "@/src/components/visitors/AddVisitorModal";
import DeleteVisitorModal from "@/src/components/visitors/DeleteVisitorModal";
import CustomSelectVisitorStatus from "@/src/components/visitors/CustomSelectStatus";
import EditVisitorModal from "@/src/components/visitors/EditVisitorModal";

export default function VisitorsPage() {
  /* ===================== DATA ===================== */
  const { data: visitors = [], isLoading } = useGetVisitors();
  const createMutation = useCreateVisitor();
  const updateMutation = useUpdateVisitor();
  /* ===================== FILTERS ===================== */
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filteredVisitors,
  } = useVisitorSearchFilter(visitors);

  /* ===================== MODALS ===================== */
  const [showAddVisitor, setShowAddVisitor] = useState(false);

  const {
    showDeleteModal,
    visitorToDelete,
    handleDelete,
    confirmDelete,
    cancelDelete,
  } = useDeleteVisitorModal();
  const [showEditVisitor, setShowEditVisitor] = useState(false);
  const [visitorToEdit, setVisitorToEdit] = useState<Visitor | null>(null);

  const openEditModal = (visitor: Visitor) => {
    setVisitorToEdit(visitor);
    setShowEditVisitor(true);
  }
  /* ===================== CREATE ===================== */
  const handleCreateVisitor = async (data: Partial<Visitor>) => {
    await createMutation.mutateAsync(data);
    setShowAddVisitor(false);
  };
  const handleEditSubmit = async (data: Partial<Visitor>) => {
    if (!visitorToEdit) return;
    await updateMutation.mutateAsync({ id: visitorToEdit.id, data });
    setShowEditVisitor(false);
    setVisitorToEdit(null);
  };

  /* ===================== UI HELPERS ===================== */
  const statusColors: Record<Visitor["status"], string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ATTENDED: "bg-green-100 text-green-800",
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* ===================== HEADER ===================== */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#183e33] mb-1">
              Visitors
            </h1>
            <p className="text-gray-600">
              Manage and review all registered visitors.
            </p>
          </div>

          <button
            onClick={() => setShowAddVisitor(true)}
            className="flex items-center gap-2 bg-[#D59D31] text-white px-4 py-2 rounded-md hover:bg-[#c68c2c] transition-colors font-medium"
          >
            <Plus size={20} />
            Add visitor
          </button>
        </div>

        {/* ===================== FILTERS ===================== */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B473A] focus:border-transparent"
            />
          </div>

          <CustomSelectVisitorStatus
            value={filterStatus}
            onChange={setFilterStatus}
          />
        </div>
      </div>

      {/* ===================== TABLE ===================== */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">
            Loading visitors...
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Major
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredVisitors.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.firstName} {v.middleName ?? ""}{" "}
                    {v.lastName} {v.secondLastName ?? ""}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {v.visitorType}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.major ?? "—"}
                  </td>

                  <td className="px-6 py-4 max-w-md text-sm text-gray-700 break-words">
                    {v.reason}
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[v.status]}`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>

                  <td onClick={() => openEditModal(v)} className="px-6 py-4 flex justify-end gap-3">
                    <button className="text-[#D59D31] hover:text-[#c68c2c]">
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(v)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===================== MODALS ===================== */}
      <AddVisitorModal
        isOpen={showAddVisitor}
        onClose={() => setShowAddVisitor(false)}
        onSubmit={handleCreateVisitor}
      />

      {showEditVisitor && visitorToEdit && (
        <EditVisitorModal
          visitor={visitorToEdit}
          onClose={() => {
            setShowEditVisitor(false);
            setVisitorToEdit(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}

      <DeleteVisitorModal
        isOpen={showDeleteModal}
        visitor={visitorToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
