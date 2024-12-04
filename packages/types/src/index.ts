import z from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should atleast be 3 characters" }),

  // TODO: can add password criteria later on
  password: z
    .string()
    .min(6, { message: "Password should atleast be 6 characters" }),

  type: z.enum(["user", "admin"], {
    message: "Invalid role",
  }),
});

export const SignInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username should atleast be 3 characters" }),

  password: z
    .string()
    .min(6, { message: "Password should atleast be 6 characters" }),
});
