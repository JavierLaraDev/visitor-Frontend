"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import type { Visitor } from "@/src/types/visitor";
import { useCreateVisitor, useGetVisitors } from "@/src/features/visitors/query";
import AddVisitorModal from "@/src/components/visitors/AddVisitorModal";

export default function VisitorsPage() {
  const { data: visitors = [], isLoading } = useGetVisitors();
  const [search, setSearch] = useState("");

  const createMutation = useCreateVisitor();

  // estados de modales
  const [showAddVisitor, setShowAddVisitor] = useState(false);

  const filteredVisitors = visitors.filter((v: Visitor) =>
    (
      v.firstName +
      " " +
      (v.middleName ?? "") +
      " " +
      v.lastName +
      " " +
      (v.secondLastName ?? "") +
      " " +
      v.reason
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ATTENDED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  const handleCreateVisitor = async (data: Partial<Visitor>) => {
    await createMutation.mutateAsync(data);
    setShowAddVisitor(false); // cerrar modal
  };

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ===================== HEADER ===================== */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#183e33] mb-1">Visitors</h1>
            <p className="text-gray-600">Manage and review all registered visitors.</p>
          </div>

          <button onClick={() => setShowAddVisitor(true)} className="flex items-center gap-2 bg-[#D59D31] text-white px-4 py-2 rounded-md hover:bg-[#c68c2c] transition-colors font-medium">
            <Plus size={20} />
            Add visitor
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search visitors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B473A] focus:border-transparent"
          />
        </div>
      </div>

      {/* ===================== TABLE ===================== */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10 overflow-x-auto">

        {isLoading ? (
          <p className="text-center text-gray-500">Loading visitors...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredVisitors.map((v: Visitor) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">

                  {/* Name */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {v.firstName} {v.middleName ?? ""} {v.lastName} {v.secondLastName ?? ""}
                    </p>
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.phone}
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {v.visitorType}
                    </span>
                  </td>

                  {/* Major */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.major ?? "—"}
                  </td>

                  {/* Reason - texto largo */}
                  <td className="px-6 py-4 max-w-md text-sm text-gray-700 whitespace-pre-wrap break-words">
                    {v.reason}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[v.status]}`}
                    >
                      {v.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-3">
                    <button className="text-[#D59D31] hover:text-[#c68c2c] flex items-center gap-1">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                      <Trash2 size={18} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
      {/* =============== MODAL =============== */}
      <AddVisitorModal isOpen={showAddVisitor} onClose={() => setShowAddVisitor(false)} onSubmit={handleCreateVisitor} />
    </div>

    
    
  );
}
