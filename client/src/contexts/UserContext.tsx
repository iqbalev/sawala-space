import { createContext, useState, useEffect, useContext } from "react";
import type {
  User,
  UserResponse,
  UserContext,
  UserProviderProps,
} from "../types";
import { useAuth } from "./AuthContext";

const UserContext = createContext<UserContext | undefined>(undefined);
export const UserProvider = ({ children }: UserProviderProps) => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
        );

        const data: UserResponse = await response.json();
        if (!response.ok) {
          setError(data.message);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};
