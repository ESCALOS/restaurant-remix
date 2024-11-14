import { redirect } from "@remix-run/node";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  expiresAt: number | null;
  role: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

interface TokenPayload {
  sub: string;
  exp: number;
  role: string;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      expiresAt: null,
      setToken: (token: string) => {
        const payload: TokenPayload = jwtDecode(token);
        set({
          token,
          expiresAt: payload.exp * 1000,
          role: payload.role,
        });
      },
      clearToken: () => {
        set({
          token: null,
          expiresAt: null,
          role: null,
        });
        redirect("/login");
      },
    }),
    {
      name: "auth-store",
    }
  )
);
