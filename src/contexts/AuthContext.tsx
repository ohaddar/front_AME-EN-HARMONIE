import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isUserAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  setAuthStatus: (role: "user" | "admin", authStatus: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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

  const setAuthStatus = (role: "user" | "admin", authStatus: boolean) => {
    if (role === "user") {
      setIsUserAuthenticated(authStatus);
    } else if (role === "admin") {
      setIsAdminAuthenticated(authStatus);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, isAdminAuthenticated, setAuthStatus }}
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
