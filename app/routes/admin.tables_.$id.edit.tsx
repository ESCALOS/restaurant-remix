import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { updateTable } from "~/services/TableService";

const EditTableSchema = z.object({
  number: z.string().min(1, "El número de la mesa es obligatorio"),
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
  const parsedData = EditTableSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { number } = parsedData.data;

  try {
    const updatedTable = await updateTable(request, { number }, parseInt(id));
    return Response.json({
      message: "Mesa actualizada exitosamente",
      table: updatedTable,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};
