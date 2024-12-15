import { ActionFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { LoaderFunction, useFetcher } from "react-router-dom";
import { toast } from "sonner";
import { Product } from "types";
import Form, { KardexFormInputs, KardexSchema } from "~/sections/kardex/Form";
import { getProducts } from "~/services/ProductService";
import { createKardex } from "~/services/KardexService";

export const loader: LoaderFunction = async ({ request }) => {
  const products = await getProducts(request);
  return Response.json(products);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = KardexSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const kardexData = parsedData.data;

  try {
    await createKardex(request, kardexData);
    return Response.json(
      { message: "Kardex creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminKardexCreate() {
  const navigate = useNavigate();
  const products = useLoaderData<Product[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Kardex creado exitosamente");
        navigate("/admin/kardex");
      }
    }
  }, [fetcher.data, navigate]);

  const onSubmit = async (data: KardexFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return (
    <Form products={products} onSubmit={onSubmit} isSubmitting={isSubmitting} />
  );
}
