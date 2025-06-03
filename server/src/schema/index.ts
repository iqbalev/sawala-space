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
        "Name can only contain letters, spaces, apostrophes, and hyphens"
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

export const nameSchema = z.object({
  newName: z
    .string()
    .trim()
    .nonempty("Please enter your name")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(
      /^(?=.*[a-zA-Z])[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens"
    ),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty("Please enter your current password"),
    newPassword: z
      .string()
      .nonempty("Please enter your new password")
      .min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().nonempty("Please confirm your new password"),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const bioSchema = z.object({
  bio: z.string().trim().nonempty("Please enter your bio"),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Please enter your post title")
    .min(5, "Title must be at least 5 characters"),
  content: z.string().trim().nonempty("Please enter your post content"),
  category: z.enum(
    [
      "art",
      "business",
      "culinary",
      "design",
      "education",
      "gaming",
      "humor",
      "lifestyle",
      "literature",
      "music",
      "programming",
      "science",
      "sports",
      "technology",
    ],
    { errorMap: () => ({ message: "Please enter a valid category" }) }
  ),
  published: z.boolean().optional().default(true),
});

export const createCommentSchema = z.object({
  content: z.string().trim().nonempty("Please enter your comment"),
});

export type SignUpReqBody = z.infer<typeof signUpSchema>;
export type SignInReqBody = z.infer<typeof signInSchema>;
export type NameReqBody = z.infer<typeof nameSchema>;
export type PasswordReqBody = z.infer<typeof passwordSchema>;
export type BioReqBody = z.infer<typeof bioSchema>;
export type CreatePostReqBody = z.infer<typeof createPostSchema>;
export type CreateCommentReqBody = z.infer<typeof createCommentSchema>;
