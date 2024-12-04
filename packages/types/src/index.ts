import z from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should atleast be 3 characters" }),

  password: z
    .string()
    .min(6, { message: "Password should atleast be 6 characters" }),

  email: z.string().min(1).email({ message: "Please enter a correct email" }),
});

export const SignInSchema = z.object({
  email: z.string().min(1).email({ message: "Please enter a correct email" }),

  password: z
    .string()
    .min(6, { message: "Password should atleast be 6 characters" }),
});
