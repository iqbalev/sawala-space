import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Please enter your name")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(
        /^(?=.*[a-zA-Z])[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/,
        "Name can only contain letters, spaces, apostrophes, and hyphens",
      ),
    email: z
      .string()
      .trim()
      .nonempty("Please enter your email")
      .email("Please enter a valid email")
      .toLowerCase(),
    password: z
      .string()
      .nonempty("Please enter your password")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Please enter your email")
    .email("Please enter a valid email")
    .toLowerCase(),
  password: z.string().nonempty("Please enter your password"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
