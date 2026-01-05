"use client";

import { CheckCircle } from "lucide-react";
import type { Visitor } from "@/src/types/visitor";
import { useGetVisitors, useUpdateVisitorStatus } from "@/src/features/visitors/query";

export default function AdminVisitorsPage() {
  /* ===================== DATA ===================== */
  const { data: visitors = [], isLoading } = useGetVisitors();
  const updateStatusMutation = useUpdateVisitorStatus();

  /* ===================== ACTIONS ===================== */
  const markAsAttended = (visitor: Visitor) => {
    updateStatusMutation.mutate({
      id: visitor.id,
      status: "ATTENDED",
    });
  };

  /* ===================== UI HELPERS ===================== */
  const statusColors: Record<Visitor["status"], string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ATTENDED: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-2xl p-8 mt-20 shadow">
      <h1 className="text-2xl font-bold mb-6">Visitors (Admin)</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading visitors...</p>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Major</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {visitors.map((v: Visitor) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">
                    {v.firstName} {v.middleName ?? ""}{" "}
                    {v.lastName} {v.secondLastName ?? ""}
                  </td>

                <td className="px-6 py-4 text-sm text-gray-700">{v.phone}</td>

                <td className="px-6 py-4 text-sm text-gray-700">{v.visitorType}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{v.major}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{v.reason}</td>

                <td className="px-3 py-4 ">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[v.status]}`}
                  >
                    {v.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {v.status === "PENDING" && (
                    <button
                      onClick={() => markAsAttended(v)}
                      disabled={updateStatusMutation.isPending}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                    >
                      <CheckCircle size={14} />
                      Mark as attended
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
