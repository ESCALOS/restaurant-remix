import { Product } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type ProductRequest = Omit<Product, "id" | "stock" | "category"> & {
  category_id: number;
};

export const getProducts = async (request: Request): Promise<Product[]> => {
  return await fetchWithAuth<Product[]>(request, "/products");
};

export const getProduct = async (
  request: Request,
  id: string
): Promise<Product> => {
  return await fetchWithAuth<Product>(request, `/products/${id}`);
};

export const createProduct = async (
  request: Request,
  data: ProductRequest
): Promise<Product> => {
  try {
    return await fetchWithAuth<Product>(request, "/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const updateProduct = async (
  request: Request,
  data: ProductRequest,
  id: string
): Promise<Product> => {
  try {
    return await fetchWithAuth<Product>(request, `/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProduct = async (
  request: Request,
  id: string
): Promise<void> => {
  try {
    await fetchWithAuth<void>(request, `/products/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
