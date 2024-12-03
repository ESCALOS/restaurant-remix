import { ActionFunction } from "@remix-run/node";
import { deleteCategory } from "~/services/CategoryService";

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: "ID de la categoría no proporcionado" },
      { status: 400 }
    );
  }

  try {
    await deleteCategory(request, parseInt(id));
    console.log("Categoría eliminada");

    return Response.json(
      { message: "Categoría eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
