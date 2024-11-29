import { Icon } from "@iconify/react/dist/iconify.js";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Product as ProductType } from "types";
import Table from "~/sections/product/Table";
import { getProducts } from "~/services/ProductService";

export const loader: LoaderFunction = async ({ request }) => {
  const products = await getProducts(request);
  return Response.json(products);
};

export default function AdminProducts() {
  const products = useLoaderData<ProductType[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteProduct = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/products/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-product",
        });
      } else {
        toast.success("Producto eliminado exitosamente", {
          id: "delete-product",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-product",
      });
    }
  }, [fetcher]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Productos
        </h1>
        <Link
          to="/admin/products/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:cube-plus" width="24" height="24" />
        </Link>
      </div>
      <Table products={products} onDelete={deleteProduct} />
    </div>
  );
}
