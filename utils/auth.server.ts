import { getSession, destroySession } from "~/session.server";
import { redirect } from "@remix-run/node";

const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchWithAuth<T>(
  request: Request,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!token) {
    throw redirect("/login");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    session.unset("token");
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (response.status === 403) {
    throw new Response("No tienes permiso para acceder a esta página", {
      status: 403,
    });
  }

  // Usa `as T` para que la respuesta sea del tipo esperado
  return response.json() as Promise<T>;
}

export const getRedirectPath = (role: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return "/admin";
    case "ROLE_WAITER":
      return "/waiter";
    case "ROLE_STOREKEEPER":
      return "/storekeeper";
    default:
      return "/";
  }
};
