import { fetchWithAuth } from "~/utils/auth.server";
import { Category } from "types";

type CategoryRequest = Omit<Category, "id" | "is_available">;

export const getCategories = async (request: Request): Promise<Category[]> => {
  return await fetchWithAuth<Category[]>(request, "/categories");
};

export const getCategory = async (
  request: Request,
  id: string
): Promise<Category> => {
  return await fetchWithAuth<Category>(request, `/categories/${id}`);
};

export const createCategory = async (
  request: Request,
  data: CategoryRequest
): Promise<Category> => {
  return await fetchWithAuth<Category>(request, "/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateCategory = async (
  request: Request,
  data: CategoryRequest,
  id: number
): Promise<Category> => {
  return await fetchWithAuth<Category>(request, `/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteCategory = async (
  request: Request,
  id: number
): Promise<void> => {
  return await fetchWithAuth<void>(request, `/categories/${id}`, {
    method: "DELETE",
  });
};
