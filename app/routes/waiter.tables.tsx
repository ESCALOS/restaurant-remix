import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";
import { getRedirectPath } from "~/utils/auth.server";
import { getTables } from "~/services/TableService";
import { Table as TableType } from "types";
import { useEffect } from "react";
import { useTableStore } from "~/store/tableStore";
import TableCard from "~/sections/table/Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AdminLayout from "~/layouts/AdminLayout";
import WaiterLayout from "~/layouts/WaiterLayout";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role: string | undefined = session.get("role");
  if (role === undefined) {
    throw redirect("/login");
  }

  const redirectPath = getRedirectPath(role);

  if (redirectPath !== "/waiter") {
    return redirect(redirectPath);
  }

  const tables = await getTables(request);
  return Response.json(tables);
};

export default function Waiter() {
  const loadTables = useLoaderData<TableType[]>();
  const { tables, setInitialTables } = useTableStore();
  const [parents] = useAutoAnimate();

  useEffect(() => {
    setInitialTables(loadTables);
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">Ordenes Por Mesa</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4" ref={parents}>
        {tables.map((table) => (
          <TableCard key={table.id} table={table} hideButtons isAvailable={table.is_available} />
        ))}
      </div>
    </div>
  );
}
