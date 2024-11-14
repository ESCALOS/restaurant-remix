import { useEffect } from "react";
import { getUser, updateUser } from "~/services/UserService";
import { toast } from "sonner";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Form, { UserFormInputs, UserSchema } from "~/sections/user/Form";
import { User } from "types";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id del usuario");
  const userId = params.id;
  const user = await getUser(request, userId);

  return { user };
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.id, "No se ha proporcionado el id del usuario");
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
    await updateUser(request, userData, params.id);
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

export default function AdminUserEdit() {
  const navigate = useNavigate();
  const { user } = useLoaderData<{ user: User }>();
  const fetcher = useFetcher<{ error: string; status: number }>();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
      } else {
        toast.success("Usuario actualizado exitosamente");
        navigate("/admin/users");
      }
    }
    if (fetcher.state === "loading") {
      toast.loading("Actualizando...");
    }
  }, [fetcher.data]);

  const onSubmit = async (data: UserFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return <Form onSubmit={onSubmit} isSubmitting={isSubmitting} user={user} />;
}
