import { UseFormRegisterReturn } from "react-hook-form";
import { JSX, ReactNode } from "react";

// -- COMPONENT TYPES -- //
// Button
export type ButtonTypeAttribute = "button" | "reset" | "submit";
export type ButtonProps = {
  label: string | JSX.Element;
  type: ButtonTypeAttribute;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

// FormInput
export type InputTypeAttribute = "email" | "password" | "text";
export type FormInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  type: InputTypeAttribute;
  placeholder: string;
  error: string | undefined;
};

// Icons
export type UserInitialIconProps = {
  userName: string;
  size: "xs" | "sm" | "xl";
};

// LoadingScreen
export type LoadingScreenProps = {
  className?: string;
};

// Message
export type MessageProps = {
  message: string;
  className?: string;
};

// -- CONTEXT TYPES -- //
// AuthContext
export type AuthContext = {
  isAuthenticated: boolean;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
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

// UserContext
export type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  error: string | null;
  isLoading: boolean;
};

export type UserProviderProps = {
  children: ReactNode;
};

export type User = {
  id: string;
  name: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserResponse = {
  success: boolean;
  message: string;
  user: User;
};

// -- PAGE TYPES -- //
// NotFoundPage
export type NotFoundPageProps = {
  message: string;
};

// ProfilePage
export type Post = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string };
};

export type PostsResponse = {
  success: boolean;
  message: string;
  posts: Post[];
};

export type Comment = {
  id: string;
  userId: string;
  content: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  post: { title: string };
  user: { name: string };
};

export type CommentsResponse = {
  success: boolean;
  message: string;
  comments: Comment[];
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

// -- OTHER TYPES -- //
// Params
export type Params = {
  userId: string;
};
