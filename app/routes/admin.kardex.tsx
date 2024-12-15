import { Icon } from "@iconify/react/dist/iconify.js";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Kardex as KardexType } from "types";
import Table from "~/sections/kardex/Table";
import { getKardexes } from "~/services/KardexService";

export const loader: LoaderFunction = async ({ request }) => {
  const kardexes = await getKardexes(request);

  return Response.json(kardexes);
};

export default function AdminKardexes() {
  const kardexes = useLoaderData<KardexType[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteKardex = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/kardex/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-kardex",
        });
      } else {
        toast.success("Kardex eliminado exitosamente", {
          id: "delete-kardex",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-kardex",
      });
    }
  }, [fetcher]);
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Kardexes
        </h1>
        <Link
          to="/admin/kardex/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:cube-plus" width="24" height="24" />
        </Link>
      </div>
      <Table kardexes={kardexes} onDelete={deleteKardex} />
    </div>
  );
}
