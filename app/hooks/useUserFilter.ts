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

  const filterUsers = () => {
    return users.filter((user) => {
      const matches = {
        name: filters.name
          ? user.name.toLowerCase().includes(filters.name.toLowerCase()) ||
            user.username.toLowerCase().includes(filters.name.toLowerCase())
          : true,
        document: filters.document
          ? user.document_number.includes(filters.document)
          : true,
        document_type: filters.document_type
          ? user.document_type === filters.document_type
          : true,
        role: filters.role ? user.role === filters.role : true,
        status: filters.status
          ? (filters.status === "enabled") === user.is_enabled
          : true,
      };

      return Object.values(matches).every(Boolean);
    });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setFilteredUsers(filterUsers());
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
