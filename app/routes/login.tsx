import type {
  ActionFunctionArgs,
  MetaFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { login } from "~/services/AuthService";
import { getRedirectPath } from "~/utils/auth.server";
import { commitSession, getSession } from "~/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Ingresar al Sistema" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("role")) {
    return redirect(getRedirectPath(session.get("role")));
  }

  const data = { error: session.get("error") as string };
  return Response.json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username && password) {
    try {
      const { token, role } = await login(username, password);

      // Guarda el token y el role en la sesión
      session.set("token", token);
      session.set("role", role);

      // Obtén la ruta de redirección según el rol
      const redirectPath = getRedirectPath(role);

      return redirect(redirectPath, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } catch (error) {
      session.flash("error", "Credenciales inválidas");
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  session.flash("error", "Usuario o contraseña no proporcionados");
  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900 text-primary-100">
      <div className="w-full max-w-sm p-8 bg-primary-800 text-accent-100 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://res.cloudinary.com/defhixtcv/image/upload/v1731013213/logo-chaufero-rmbg_s80bkw.webp"
            alt="Logo de El Chaufero"
            className="w-32 h-32 rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-accent-500 text-center mb-6">
          Iniciar sesión
        </h1>

        {error ? <div className="error text-red-500 mb-4">{error}</div> : null}

        <Form key="login" method="post" id="login-form">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-primary-200 font-medium mb-1"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 rounded bg-primary-900 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Tu nombre de usuario"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-primary-200 font-medium mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 rounded bg-primary-900 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-accent-500 text-primary-900 font-semibold rounded hover:bg-accent-400 transition"
          >
            Iniciar sesión
          </button>
        </Form>
      </div>
    </div>
  );
}
