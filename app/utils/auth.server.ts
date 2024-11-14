import { getSession, destroySession } from "~/session.server";
import { redirect } from "@remix-run/node";
import { RoleEnum } from "./enums/RoleEnum";

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
    "Content-Type": "application/json",
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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en la petición al servidor");
  }

  // Si es DELETE, devolvemos void explícitamente
  if (options.method === "DELETE" && response.status === 204) {
    return undefined as unknown as T; // Asegura que `deleteUser` reciba `void`
  }

  return response.json() as Promise<T>;
}

// Mapeo de roles a rutas
const rolePaths: Record<RoleEnum, string> = {
  [RoleEnum.ADMIN]: "/admin",
  [RoleEnum.WAITER]: "/waiter",
  [RoleEnum.STOREKEEPER]: "/storekeeper",
};

// Función para obtener la ruta de redirección basada en el rol
export const getRedirectPath = (role: string): string => {
  return rolePaths[role.split("_")[1] as RoleEnum] || "/logout";
};
