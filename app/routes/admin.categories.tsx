import { Icon } from "@iconify/react/dist/iconify.js";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Category as CategoryType } from "types";
import Table from "~/sections/category/Table";
import { getCategories } from "~/services/CategoryService";

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories(request);
  return Response.json(categories);
};

export default function AdminCategories() {
  const categories = useLoaderData<CategoryType[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteCategory = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/categories/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-category",
        });
      } else {
        toast.success("Categoría eliminada exitosamente", {
          id: "delete-category",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-category",
      });
    }
  }, [fetcher]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Categorías
        </h1>
        <Link
          to="/admin/categories/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:category-plus" width="24" height="24" />
        </Link>
      </div>
      <Table categories={categories} onDelete={deleteCategory} />
    </div>
  );
}
