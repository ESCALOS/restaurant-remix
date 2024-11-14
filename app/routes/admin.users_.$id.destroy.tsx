import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteUser } from "~/services/UserService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id del usuario");
  const userId = params.id;

  try {
    await deleteUser(request, userId);
    return Response.json(
      { message: "Usuario eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
