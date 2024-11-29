import { useEffect } from "react";
import { getTable, updateTable } from "~/services/TableService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, { TableFormInputs, TableSchema } from "~/sections/table/Form";
import { Table } from "types";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la mesa");
  const tableId = params.id;
  const table = await getTable(request, tableId);

  return { table };
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la mesa");
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
    await updateTable(request, tableData, params.id);
    return Response.json(
      { message: "Mesa editada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminTableEdit() {
  const navigate = useNavigate();
  const { table } = useLoaderData<{ table: Table }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";
  const action = "edit-table";
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, { id: action });
      } else {
        toast.success("Mesa actualizada exitosamente", { id: action });
        navigate("/admin/tables");
      }
    }
    if (fetcher.state === "loading") {
      toast.loading("Actualizando...", { id: action });
    }
  }, [fetcher.data, fetcher.state, navigate]);

  const onSubmit = async (data: TableFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return <Form onSubmit={onSubmit} isSubmitting={isSubmitting} table={table} />;
}
