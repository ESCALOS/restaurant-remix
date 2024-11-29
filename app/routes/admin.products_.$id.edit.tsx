import { useEffect } from "react";
import { getProduct, updateProduct } from "~/services/ProductService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, {
  ProductFormInputs,
  ProductSchema,
} from "~/sections/product/Form";
import { Category, Product } from "types";
import invariant from "tiny-invariant";
import { getCategories } from "~/services/CategoryService";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la producto");
  const productId = params.id;
  const product = await getProduct(request, productId);
  const categories = await getCategories(request);

  return { product, categories };
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la producto");
  const formData = await request.formData();
  const parsedData = ProductSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const productData = parsedData.data;

  try {
    await updateProduct(request, productData, params.id);
    return Response.json(
      { message: "Producto editado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminProductEdit() {
  const navigate = useNavigate();
  const { product, categories } = useLoaderData<{
    product: Product;
    categories: Category[];
  }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";
  const action = "edit-product";
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, { id: action });
      } else {
        toast.success("Producto actualizado exitosamente", { id: action });
        navigate("/admin/products");
      }
    }
    if (fetcher.state === "loading") {
      toast.loading("Actualizando...", { id: action });
    }
  }, [fetcher.data, fetcher.state, navigate]);

  const onSubmit = async (data: ProductFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return (
    <Form
      categories={categories}
      product={product}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
