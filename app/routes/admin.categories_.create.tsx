import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { createCategory } from "~/services/CategoryService";

// Esquema de validación para los datos de la mesa
const CategorySchema = z.object({
  name: z.string().min(1, "El número de la mesa es obligatorio"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = CategorySchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name } = parsedData.data;

  try {
    // Crear mesa
    const newCategory = await createCategory(request, { name });
    return Response.json(
      { message: "Mesa creada exitosamente", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
