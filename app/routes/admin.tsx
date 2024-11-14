import { LoaderFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";
import { getSession } from "~/session.server";
import { getRedirectPath } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role: string | undefined = session.get("role");
  if (role === undefined) {
    throw redirect("/login");
  }

  const redirectPath = getRedirectPath(role);

  if (redirectPath !== "/admin") {
    return redirect(redirectPath);
  }
  return Response.json({});
};

export default function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
