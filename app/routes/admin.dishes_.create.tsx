import { ActionFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { LoaderFunction, useFetcher } from "react-router-dom";
import { toast } from "sonner";
import { Category } from "types";
import Form, { DishFormInputs, DishSchema } from "~/sections/dish/Form";
import { getCategories } from "~/services/CategoryService";
import { createDish } from "~/services/DishService";

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories(request);
  return Response.json(categories);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = DishSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const dishData = parsedData.data;

  try {
    await createDish(request, dishData);
    return Response.json(
      { message: "Dish creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminDishCreate() {
  const navigate = useNavigate();
  const categories = useLoaderData<Category[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Dish creado exitosamente");
        navigate("/admin/dishes");
      }
    }
  }, [fetcher.data, navigate]);

  const onSubmit = async (data: DishFormInputs) => {
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
