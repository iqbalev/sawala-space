import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";

type AuthContext = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (token: string) => void;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string | null;
};

type JwtPayload = {
  exp: number;
  id: string;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const isTokenExpired = decodedToken.exp * 1000 > Date.now(); // Return true if token is not expired yet, false otherwise
      if (isTokenExpired) {
        localStorage.removeItem("token");
      } else {
        setUser({ id: decodedToken.id });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode<JwtPayload>(token);
    setUser({ id: decodedToken.id });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      // !!user means: If user exists it will be true
      value={{ isAuthenticated: !!user, user, setUser, signIn, signOut }}
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
