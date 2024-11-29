import { useEffect } from "react";
import { getDish, updateDish } from "~/services/DishService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, { DishFormInputs, DishSchema } from "~/sections/dish/Form";
import { Category, Dish } from "types";
import invariant from "tiny-invariant";
import { getCategories } from "~/services/CategoryService";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la dish");
  const dishId = params.id;
  const dish = await getDish(request, dishId);
  const categories = await getCategories(request);

  return { dish, categories };
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la dish");
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
    await updateDish(request, dishData, params.id);
    return Response.json(
      { message: "Dish editado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminDishEdit() {
  const navigate = useNavigate();
  const { dish, categories } = useLoaderData<{
    dish: Dish;
    categories: Category[];
  }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";
  const action = "edit-dish";
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, { id: action });
      } else {
        toast.success("Dish actualizado exitosamente", { id: action });
        navigate("/admin/dishes");
      }
    }
    if (fetcher.state === "loading") {
      toast.loading("Actualizando...", { id: action });
    }
  }, [fetcher.data, fetcher.state, navigate]);

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
      dish={dish}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
