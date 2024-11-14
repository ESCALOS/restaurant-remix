import { Table } from "types";
import { fetchWithAuth } from "~/utils/auth.server";

export const getTables = async (request: Request) => {
  return await fetchWithAuth<Table[]>(request, "/tables");
};
