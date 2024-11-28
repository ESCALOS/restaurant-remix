import { useEffect } from "react";
import { createUser } from "~/services/UserService";
import { toast } from "sonner";
import { ActionFunction } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import Form, { UserFormInputs, UserSchema } from "~/sections/user/Form";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const parsedData = UserSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return Response.json(
      { errors: parsedData.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const userData = parsedData.data;

  try {
    await createUser(request, userData);
    return Response.json(
      { message: "Usuario creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

export default function AdminUserCreate() {
  const navigate = useNavigate();

  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Usuario creado exitosamente");
        navigate("/admin/users");
      }
    }
  }, [fetcher.data, navigate]);

  const onSubmit = async (data: UserFormInputs) => {
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
