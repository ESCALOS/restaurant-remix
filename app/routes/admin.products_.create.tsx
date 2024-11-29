import { useEffect } from "react";
import { createProduct } from "~/services/ProductService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, {
  ProductFormInputs,
  ProductSchema,
} from "~/sections/product/Form";
import { getCategories } from "~/services/CategoryService";
import { Category } from "types";

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories(request);
  return Response.json(categories);
};

export const action: ActionFunction = async ({ request }) => {
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
    await createProduct(request, productData);
    return Response.json(
      { message: "Producto creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminProductCreate() {
  const navigate = useNavigate();
  const categories = useLoaderData<Category[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Producto creado exitosamente");
        navigate("/admin/products");
      }
    }
  }, [fetcher.data, navigate]);

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
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
