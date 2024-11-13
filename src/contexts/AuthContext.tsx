import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/classes/User";
import { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        setAuthStatus(parsedUser.role === "USER" ? "user" : "admin", true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "USER") {
        setIsUserAuthenticated(true);
      } else if (parsedUser.role === "ADMIN") {
        setIsAdminAuthenticated(true);
      }
    }
  }, []);

  const blog = () => {
    setIsAdminAuthenticated(true);
  };

  const feedback = () => {
    setIsUserAuthenticated(true);
  };

  const setAuthStatus = (role: "user" | "admin", authStatus: boolean) => {
    if (role === "user") {
      setIsUserAuthenticated(authStatus);
    } else if (role === "admin") {
      setIsAdminAuthenticated(authStatus);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        isAdminAuthenticated,
        currentUser,
        setAuthStatus,
        blog,
        feedback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
