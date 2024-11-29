import { ActionFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "sonner";
import Form, {
  CategoryFormInputs,
  CategorySchema,
} from "~/sections/category/Form";
import { createCategory } from "~/services/CategoryService";

export const action: ActionFunction = async ({ request }) => {
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
    await createCategory(request, categoryData);
    return Response.json(
      { message: "Categoría creada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminCategoryCreate() {
  const navigate = useNavigate();

  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Categoría creada exitosamente");
        navigate("/admin/categories");
      }
    }
  }, [fetcher.data, navigate]);

  const onSubmit = async (data: CategoryFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return <Form onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}
