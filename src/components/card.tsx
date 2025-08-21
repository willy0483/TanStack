import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { User } from "../lib/types";
import { createUserQueryOptions } from "../queryOptions/createUserQueryOptions";
import { toast } from "sonner";

const UserCard = ({ id, name, email }: User) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => api.user.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createUserQueryOptions().queryKey,
      });
      toast.info("UserID " + id + " was created");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDelete = async (id: number) => {
    mutate(id);
  };

  return (
    <div className="bg-white rounded-xl relative w-full">
      <button
        onClick={() => handleDelete(id)}
        className="absolute top-0 right-0 p-2 rounded-full hover:bg-red-50 hover:cursor-pointer transition-colors duration-200"
        aria-label="Delete user"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500">ID: {id}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
