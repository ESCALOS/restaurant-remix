import { Kardex } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type KardexRequest = {
  product_id: number;
  quantity: number;
  movement_type: "INPUT" | "OUTPUT";
  reason: string;
};

export const getKardexes = async (request: Request): Promise<Kardex[]> => {
  return await fetchWithAuth<Kardex[]>(request, "/product-movements");
};

export const getKardex = async (
  request: Request,
  id: string
): Promise<Kardex> => {
  return await fetchWithAuth<Kardex>(request, `/product-movements/${id}`);
};

export const createKardex = async (
  request: Request,
  data: KardexRequest
): Promise<Kardex> => {
  try {
    return await fetchWithAuth<Kardex>(request, "/product-movements", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al crear kardex:", error);
    throw error;
  }
};

export const updateKardexQuantity = async (
  quantity: number,
  request: Request,
  id: string
): Promise<Kardex> => {
  try {
    return await fetchWithAuth<Kardex>(
      request,
      `/product-movements/${id}?quantity=${quantity}`,
      {
        method: "PATCH",
      }
    );
  } catch (error) {
    console.error("Error al actualizar kardex:", error);
    throw error;
  }
};

export const deleteKardex = async (
  request: Request,
  id: string
): Promise<void> => {
  try {
    await fetchWithAuth<void>(request, `/product-movements/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar kardex:", error);
    throw error;
  }
};
