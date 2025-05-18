import { UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

// FormInput
export type InputTypeAttribute = "email" | "password" | "text";
export type FormInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  type: InputTypeAttribute;
  placeholder: string;
  error: string | undefined;
};

// Message
export type MessageProps = {
  message: string;
};

// AuthContext
export type AuthContext = {
  isAuthenticated: boolean;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (token: string) => void;
  signOut: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type JwtPayload = {
  exp: number;
  id: string;
};

// NotFoundPage
export type NotFoundPageProps = {
  message: string;
};

// ProfilePage
export type UserAbout = {
  id: string;
  name: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAboutResponse = {
  success: boolean;
  message: string;
  user: UserProfile;
};

export type UserPosts = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string };
};

export type UserPostsResponse = {
  success: boolean;
  message: string;
  posts: UserPosts[];
};

export type UserComments = {
  id: string;
  userId: string;
  content: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  post: { title: string };
  user: { name: string };
};

export type UserCommentsResponse = {
  success: boolean;
  message: string;
  comments: UserComments[];
};

// SignInPage
export type SignInResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

// SignUpPage
export type SignUpResponse = {
  success: boolean;
  message: string;
};

// Params
export type Params = {
  userId: string;
};
