import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { createTable } from "~/services/TableService";

// Esquema de validación para los datos de la mesa
const TableSchema = z.object({
  number: z.string().min(1, "El número de la mesa es obligatorio"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = TableSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { number } = parsedData.data;

  try {
    // Crear mesa
    const newTable = await createTable(request, { number });
    return Response.json(
      { message: "Mesa creada exitosamente", table: newTable },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    console.log("Error al crear la mesa", error);

    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
