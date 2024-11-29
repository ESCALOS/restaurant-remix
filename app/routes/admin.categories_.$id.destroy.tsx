import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteCategory } from "~/services/CategoryService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id de la categoría");
  const categoryId = params.id;

  try {
    await deleteCategory(request, categoryId);
    return Response.json(
      { message: "Categoría eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
