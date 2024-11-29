import { useEffect } from "react";
import { getCategory, updateCategory } from "~/services/CategoryService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, {
  CategoryFormInputs,
  CategorySchema,
} from "~/sections/category/Form";
import { Category } from "types";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la categoría");
  const categoryId = params.id;
  const category = await getCategory(request, categoryId);

  return { category };
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id de la categoría");
  const formData = await request.formData();
  const parsedData = CategorySchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const categoryData = parsedData.data;

  try {
    await updateCategory(request, categoryData, params.id);
    return Response.json(
      { message: "Categoría editada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminCategoryEdit() {
  const navigate = useNavigate();
  const { category } = useLoaderData<{ category: Category }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";
  const action = "edit-category";
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, { id: action });
      } else {
        toast.success("Categoría actualizada exitosamente", { id: action });
        navigate("/admin/categories");
      }
    }
    if (fetcher.state === "loading") {
      toast.loading("Actualizando...", { id: action });
    }
  }, [fetcher.data, fetcher.state, navigate]);

  const onSubmit = async (data: CategoryFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return (
    <Form onSubmit={onSubmit} isSubmitting={isSubmitting} category={category} />
  );
}
