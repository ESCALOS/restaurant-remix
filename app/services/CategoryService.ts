import { Category } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type CategoryRequest = Omit<Category, "id" | "created_at" | "updated_at">;

export const getCategories = async (request: Request) => {
  return await fetchWithAuth<Category[]>(request, "/categories");
};

export const getCategory = async (request: Request, id: string) => {
  return await fetchWithAuth<Category>(request, `/categories/${id}`);
};

export const createCategory = async (
  request: Request,
  data: CategoryRequest
): Promise<Category> => {
  try {
    return await fetchWithAuth<Category>(request, "/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    throw error;
  }
};

export const updateCategory = async (
  request: Request,
  data: CategoryRequest,
  id: string
): Promise<Category> => {
  try {
    return await fetchWithAuth<Category>(request, `/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};

export const deleteCategory = async (
  request: Request,
  id: string
): Promise<void> => {
  try {
    await fetchWithAuth<void>(request, `/categories/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};
