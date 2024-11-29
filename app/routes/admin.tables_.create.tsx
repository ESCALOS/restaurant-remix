import { ActionFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "sonner";
import Form, { TableFormInputs, TableSchema } from "~/sections/table/Form";
import { createTable } from "~/services/TableService";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = TableSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const tableData = parsedData.data;

  try {
    await createTable(request, tableData);
    return Response.json(
      { message: "Mesa creada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminTableCreate() {
  const navigate = useNavigate();

  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Mesa creada exitosamente");
        navigate("/admin/tables");
      }
    }
  }, [fetcher.data, navigate]);

  const onSubmit = async (data: TableFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return <Form onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}
