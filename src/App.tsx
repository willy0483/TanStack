import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import UserCard from "./components/card";
import { createUserQueryOptions } from "./queryOptions/createUserQueryOptions";
import { api } from "./lib/api";
import { Spinner } from "./components/spinner";
import type { CreateUser } from "./lib/types";
import { toast } from "sonner";

const App = () => {
  const {
    data: user,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery(createUserQueryOptions());
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (user: CreateUser) => api.user.create(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: createUserQueryOptions().queryKey,
      });
      toast.info("User " + data?.name + " was created");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleCreate = () => {
    const user = {
      name: "test",
      email: `${Math.random().toString(36).substring(2)}@gmail.com`,
      password: "test",
      description: "test",
      refreshToken: "wdawd",
      imageId: 1,
    };
    mutate(user);
  };

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-red-400 mb-4">Something went wrong.</p>
          <p className="text-red-400">Error: {error.message}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow">
          User Management
        </h1>
        <p className="text-gray-400 mt-2">Manage your users easily</p>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-8">
          <p className="text-xl text-white mb-6 text-center">
            Total Users:
            <span className="font-semibold">
              {user ? user.length : "Loading..."}
            </span>
          </p>
          <div className="flex flex-col gap-4 min-h-[200px]">
            {isPending ? (
              <div className="flex items-center justify-center h-[200px]">
                <Spinner />
              </div>
            ) : user?.length ? (
              user.map((item) => <UserCard {...item} key={item.id} />)
            ) : (
              <p className="text-gray-400 text-center">No users found.</p>
            )}
          </div>
          <button
            className="w-full mt-8 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400 p-3 rounded-lg text-white font-semibold transition"
            onClick={handleCreate}
          >
            + Create New User
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
