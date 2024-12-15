import { useEffect } from "react";
import { getKardex, updateKardexQuantity } from "~/services/KardexService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, { KardexFormInputs, KardexSchema } from "~/sections/kardex/Form";
import { Kardex, Product } from "types";
import invariant from "tiny-invariant";
import { getProducts } from "~/services/ProductService";

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "ID de la kardex no proporcionado");
  const kardexId = params.id;
  const kardex = await getKardex(request, kardexId);
  const products = await getProducts(request);

  return Response.json({ kardex, products });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.id, "ID de la kardex no proporcionado");
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
    await updateKardexQuantity(kardexData.quantity, request, params.id);
    return Response.json(
      { message: "Kardex actualizado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminKardexEdit() {
  const navigate = useNavigate();
  const { kardex, products } = useLoaderData<{
    kardex: Kardex;
    products: Product[];
  }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";
  const action = "edit-kardex";

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, { id: action });
        console.log(fetcher.data);
      } else {
        toast.success("Kardex actualizado exitosamente", { id: action });
        navigate(`/admin/kardex`);
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Actualizando...", {
        id: action,
      });
    }
  }, [fetcher.data, fetcher.state, navigate]);

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
    <Form
      products={products}
      kardex={kardex}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
