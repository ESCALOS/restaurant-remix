import { Icon } from "@iconify/react/dist/iconify.js";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Dish as DishType } from "types";
import Table from "~/sections/dish/Table";
import { getDishes } from "~/services/DishService";

export const loader: LoaderFunction = async ({ request }) => {
  const dishes = await getDishes(request);
  return Response.json(dishes);
};

export default function AdminDishes() {
  const dishes = useLoaderData<DishType[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteDish = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/dishes/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-dish",
        });
      } else {
        toast.success("Dish eliminado exitosamente", {
          id: "delete-dish",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-dish",
      });
    }
  }, [fetcher]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Dishes
        </h1>
        <Link
          to="/admin/dishes/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:category-plus" width="24" height="24" />
        </Link>
      </div>
      <Table dishes={dishes} onDelete={deleteDish} />
    </div>
  );
}
