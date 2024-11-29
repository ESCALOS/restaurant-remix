import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteDish } from "~/services/DishService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id de la dish");
  const dishId = params.id;

  try {
    await deleteDish(request, dishId);
    return Response.json(
      { message: "Dish eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
