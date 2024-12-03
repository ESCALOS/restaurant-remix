import { fetchWithAuth } from "~/utils/auth.server";
import { Table } from "types";

type TableRequest = Omit<Table, "id" | "is_available">;

export const getTables = async (request: Request): Promise<Table[]> => {
  return await fetchWithAuth<Table[]>(request, "/tables");
};

export const getTable = async (
  request: Request,
  id: string
): Promise<Table> => {
  return await fetchWithAuth<Table>(request, `/tables/${id}`);
};

export const createTable = async (
  request: Request,
  data: TableRequest
): Promise<Table> => {
  return await fetchWithAuth<Table>(request, "/tables", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTable = async (
  request: Request,
  data: TableRequest,
  id: number
): Promise<Table> => {
  return await fetchWithAuth<Table>(request, `/tables/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTable = async (
  request: Request,
  id: number
): Promise<void> => {
  return await fetchWithAuth<void>(request, `/tables/${id}`, {
    method: "DELETE",
  });
};
