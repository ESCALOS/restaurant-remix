import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
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

  return Response.json({});
};

export default function Waiter() {
  return (
    <WaiterLayout>
      <Outlet />
    </WaiterLayout>
  );
}
