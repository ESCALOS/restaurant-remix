import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";
import { getRedirectPath } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const role: string | undefined = session.get("role");
  if (role === undefined) {
    throw redirect("/login");
  }

  const redirectPath = getRedirectPath(role);

  if (redirectPath !== "/waiter") {
    return redirect(redirectPath);
  }
  return Response.json({});
};

export default function Waiter() {
  return <h1>Waiter</h1>;
}
