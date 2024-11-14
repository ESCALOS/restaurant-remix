// services/UserService.ts
import { User } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

type UserRequest = Omit<
  User,
  "id" | "is_enabled" | "created_at" | "updated_at"
>;

export const getUsers = async (request: Request): Promise<User[]> => {
  return await fetchWithAuth<User[]>(request, "/users");
};

export const getUser = async (request: Request, id: string): Promise<User> => {
  return await fetchWithAuth<User>(request, `/users/${id}`);
};

export const createUser = async (
  request: Request,
  data: UserRequest
): Promise<User> => {
  return await fetchWithAuth<User>(request, "/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateUser = async (
  request: Request,
  data: UserRequest,
  id: string
): Promise<User> => {
  return await fetchWithAuth<User>(request, `/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (
  request: Request,
  id: string
): Promise<void> => {
  await fetchWithAuth<void>(request, `/users/${id}`, {
    method: "DELETE",
  });
};
