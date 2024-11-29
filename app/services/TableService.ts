import { Table } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type TableRequest = Omit<Table, "id" | "is_available">;

export const getTables = async (request: Request) => {
  return await fetchWithAuth<Table[]>(request, "/tables");
};

export const getTable = async (request: Request, id: string) => {
  return await fetchWithAuth<Table>(request, `/tables/${id}`);
};

export const createTable = async (
  request: Request,
  data: TableRequest
): Promise<Table> => {
  try {
    return await fetchWithAuth<Table>(request, "/tables", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al crear tabla:", error);
    throw error;
  }
};

export const updateTable = async (
  request: Request,
  data: TableRequest,
  id: string
): Promise<Table> => {
  try {
    return await fetchWithAuth<Table>(request, `/tables/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al actualizar tabla:", error);
    throw error;
  }
};

export const deleteTable = async (
  request: Request,
  id: string
): Promise<void> => {
  try {
    await fetchWithAuth<void>(request, `/tables/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar tabla:", error);
    throw error;
  }
};
