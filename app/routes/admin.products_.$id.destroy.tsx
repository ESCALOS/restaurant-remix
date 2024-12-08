import { ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteProduct } from "~/services/ProductService";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "No se ha proporcionado el id de la producto");
  const productId = params.id;

  try {
    await deleteProduct(request, productId);
    return Response.json(
      { message: "Producto eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
