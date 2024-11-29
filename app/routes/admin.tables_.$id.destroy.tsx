import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteTable } from "~/services/TableService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id de la mesa");
  const tableId = params.id;

  try {
    await deleteTable(request, tableId);
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
