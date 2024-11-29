import { Dish } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type DishRequest = Omit<Dish, "id">;

export const getDishes = async (request: Request): Promise<Dish[]> => {
  return await fetchWithAuth<Dish[]>(request, "/dishes");
};

export const getDish = async (request: Request, id: string): Promise<Dish> => {
  return await fetchWithAuth<Dish>(request, `/dishes/${id}`);
};

export const createDish = async (
  request: Request,
  data: DishRequest
): Promise<Dish> => {
  try {
    return await fetchWithAuth<Dish>(request, "/dishes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al crear plato:", error);
    throw error;
  }
};

export const updateDish = async (
  request: Request,
  data: DishRequest,
  id: string
): Promise<Dish> => {
  try {
    return await fetchWithAuth<Dish>(request, `/dishes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error al actualizar plato:", error);
    throw error;
  }
};

export const deleteDish = async (
  request: Request,
  id: string
): Promise<void> => {
  try {
    await fetchWithAuth<void>(request, `/dishes/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar plato:", error);
    throw error;
  }
};
