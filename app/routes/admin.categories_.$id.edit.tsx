import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { updateCategory } from "~/services/CategoryService";

const EditCategorySchema = z.object({
  name: z.string().min(1, "El número de la mesa es obligatorio"),
});

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: "ID de la mesa no proporcionado" },
      { status: 400 }
    );
  }

  const formData = await request.formData();
  const parsedData = EditCategorySchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name } = parsedData.data;

  try {
    const updatedCategory = await updateCategory(
      request,
      { name },
      parseInt(id)
    );
    return Response.json({
      message: "Mesa actualizada exitosamente",
      category: updatedCategory,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
