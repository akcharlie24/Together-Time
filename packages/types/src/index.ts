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

export const CreateChannelSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Enter a valid name of atleast 2 characters" }),

  // TODO: can change to required as per requiremenets later on
  description: z.string().optional(),

  slug: z.string().min(3, { message: "Slug should atleast be 3 characters" }),
});
