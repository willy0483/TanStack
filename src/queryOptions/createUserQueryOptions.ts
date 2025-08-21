import { queryOptions } from "@tanstack/react-query";
import type { User } from "../lib/types";
import { BACKEND_URL } from "@/lib/constants";

export const createUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

const getUser = async (): Promise<User[]> => {
  const response = await fetch(`${BACKEND_URL}/users`);
  return response.json();
};
