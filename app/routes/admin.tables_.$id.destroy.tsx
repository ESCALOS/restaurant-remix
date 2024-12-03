import { ActionFunction } from "@remix-run/node";
import { deleteTable } from "~/services/TableService";

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: "ID de la mesa no proporcionado" },
      { status: 400 }
    );
  }

  try {
    await deleteTable(request, parseInt(id));

    return Response.json(
      { message: "Mesa eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
