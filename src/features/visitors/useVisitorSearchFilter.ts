import { useState } from "react";
import type { Visitor } from "@/src/types/visitor";
import type { VisitorType, AttentionStatus } from "@/src/types/visitor";

export const useVisitorSearchFilter = (visitors: Visitor[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredVisitors = visitors.filter((visitor:Visitor) => {
    const fullName = `${visitor.firstName} ${visitor.middleName ?? ""} ${visitor.lastName} ${visitor.secondLastName ?? ""}`
      .toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      visitor.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || visitor.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return {
    // search
    searchTerm,
    setSearchTerm,

    // filters
    filterStatus,
    setFilterStatus,

    // result
    filteredVisitors,
  };
};
