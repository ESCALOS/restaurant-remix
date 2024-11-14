import { useState, useEffect } from "react";
import type { User } from "types";

export interface UserFilters {
  name: string;
  document: string;
  document_type: "DNI" | "CE" | "PP" | "";
  role: "ADMIN" | "WAITER" | "STOREKEEPER" | "";
  status: "enabled" | "disabled" | "";
}

export const useUserFilter = (users: User[]) => {
  const [filters, setFilters] = useState<UserFilters>({
    name: "",
    document: "",
    document_type: "",
    role: "",
    status: "",
  });

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const results = users.filter((user) => {
        const matchesName = filters.name
          ? user.name.toLowerCase().includes(filters.name.toLowerCase()) ||
            user.username.toLowerCase().includes(filters.name.toLowerCase())
          : true;
        const matchesDocument = filters.document
          ? user.document_number.includes(filters.document)
          : true;
        const matchesDocumentType = filters.document_type
          ? user.document_type === filters.document_type
          : true;
        const matchesRole = filters.role ? user.role === filters.role : true;
        const matchesStatus = filters.status
          ? (filters.status === "enabled") === user.is_enabled
          : true;

        return (
          matchesName &&
          matchesDocument &&
          matchesDocumentType &&
          matchesRole &&
          matchesStatus
        );
      });
      setFilteredUsers(results);
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [filters, users]);

  const updateFilter = (key: keyof UserFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value as any }));
  };

  return {
    filters,
    updateFilter,
    filteredUsers,
  };
};
