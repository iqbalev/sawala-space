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
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserResponse = {
  success: boolean;
  message: string;
  user: UserProfile;
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
