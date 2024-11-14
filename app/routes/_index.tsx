import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { getRedirectPath } from "~/utils/auth.server";
import { getSession } from "~/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role: string | undefined = session.get("role");
  if (role === undefined) {
    throw redirect("/login");
  }

  const redirectPath = getRedirectPath(role);

  if (redirectPath === "/") {
    return redirect("/admin");
  }
  return Response.json({});
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900 text-primary-100">
      <h1>Creo que no tienes rol de usuario</h1>
      <button>Salir</button>
    </div>
  );
}
