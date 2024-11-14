import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/services/UserService";
import { User } from "types";
import { useUserFilter } from "~/hooks/useUserFilter";
import Table from "~/sections/user/Table";
import Filters from "~/sections/user/Filters";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { toast } from "sonner";

export const loader: LoaderFunction = async ({ request }) => {
  const users = await getUsers(request);
  return Response.json(users);
};

export default function Users() {
  const users = useLoaderData<User[]>();
  const { filters, updateFilter, filteredUsers } = useUserFilter(users);
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteUser = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/users/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-user",
        });
      } else {
        toast.success("Usuario eliminado exitosamente", {
          id: "delete-user",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-user",
      });
    }
  }, [fetcher]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de usuarios
        </h1>
        <Link
          to="/admin/users/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:user-plus" width="24" height="24" />
        </Link>
      </div>
      <Filters filters={filters} updateFilter={updateFilter} />
      <Table users={filteredUsers} onDelete={deleteUser} />
    </div>
  );
}
