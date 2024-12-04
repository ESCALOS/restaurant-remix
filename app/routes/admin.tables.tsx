import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTables } from "~/services/TableService";
import { Table as TableType } from "types";
import { useTableStore } from "~/store/tableStore";
import { useEffect } from "react";
import TableCard from "~/sections/table/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const loader: LoaderFunction = async ({ request }) => {
  const tables = await getTables(request);
  return Response.json(tables);
};

export default function AdminTablesPage() {
  const loadTables = useLoaderData<TableType[]>();
  const { tables, setInitialTables, addTable } = useTableStore();
  const [parents] = useAutoAnimate();

  useEffect(() => {
    setInitialTables(loadTables);
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Mesas
        </h1>
        <button
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
          onClick={addTable}
        >
          <Icon icon="tabler:table-plus" width="24" height="24" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4" ref={parents}>
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
}
