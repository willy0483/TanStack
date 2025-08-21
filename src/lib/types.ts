import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  image: {
    url: z.string(),
  },
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  description: z.string(),
  refreshToken: z.string(),
  imageId: z.number(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
