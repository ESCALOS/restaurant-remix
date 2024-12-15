import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteKardex } from "~/services/KardexService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id de la kardex");
  const kardexId = params.id;

  try {
    await deleteKardex(request, kardexId);
    return Response.json(
      { message: "Kardex eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
