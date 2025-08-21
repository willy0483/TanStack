import { BACKEND_URL } from "./constants";
import type { CreateUser } from "./types";

export const api = {
  user: {
    async get() {
      const res = await fetch(`${BACKEND_URL}/users`);
      const data = await res.json();
      return data;
    },

    async create(user: CreateUser) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const res = await fetch(`${BACKEND_URL}/users`, options);
      if (!res.ok) {
        throw new Error(
          `API Error: ${res.status} ${res.statusText} ${res.text}`
        );
      }
      return res.json();
    },

    async delete(id: number) {
      const options = {
        method: "DELETE",
      };
      const res = await fetch(`${BACKEND_URL}/users/${id}`, options);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    },
  },
};
