import { Outlet } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
