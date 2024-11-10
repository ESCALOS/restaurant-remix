import { jwtDecode } from "jwt-decode";
import { commitSession, getSession } from "~/session.server";

interface AuthResponse {
  token: string;
}

interface JwtPayload {
  role: string;
}

export async function login(username: string, password: string) {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error de autenticación");
  }

  const data: AuthResponse = await response.json();

  // Decodifica el rol del token
  const decoded: JwtPayload = jwtDecode(data.token);
  const role = decoded.role;

  return { token: data.token, role };
}

export async function saveSession(token: string, request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", token);
  return commitSession(session);
}
