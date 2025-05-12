import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import type {
  AuthContext,
  AuthProviderProps,
  JwtPayload,
} from "../types/index";

const AuthContext = createContext<AuthContext | undefined>(undefined);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const isTokenValid = decodedToken.exp * 1000 > Date.now(); // Return true if token is still valid (e.g. not expired yet), false otherwise
      if (!isTokenValid) {
        localStorage.removeItem("token");
      } else {
        setUserId(decodedToken.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode<JwtPayload>(token);
    setUserId(decodedToken.id);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      // !!userId means: If userId exists it will be true
      value={{ isAuthenticated: !!userId, userId, setUserId, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
