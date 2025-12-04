import { useState } from "react";
import type { User } from "@/src/types/User";

export const useUserSearchFilter = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredUsers = users.filter((user: User) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return {
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    filteredUsers,
  };
};

