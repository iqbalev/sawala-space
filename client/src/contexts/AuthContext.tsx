import { ReactNode, createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContext = {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type JwtPayload = {
  exp: number;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.exp * 1000 > Date.now(); // Return true if token is not expired yet, false otherwise
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    isTokenValid() // True if token exists and not expired, false otherwise (null)
  );

  const signIn = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
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
