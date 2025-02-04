import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/classes/User";
import { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Both email and password are required.");
      setIsLoading(false);
      return;
    }
    try {
      const blockResponse = await axios.get(
        `http://localhost:8080/auth/isBlocked/${email}`,
      );
      if (blockResponse.data) {
        setErrorMessage("Too many failed attempts. Try again later.");
        setIsLoading(false);
        return;
      }
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      setCurrentUser(response.data);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setErrorMessage("Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
  ) => {
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !avatar.trim()
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    // const isValidEmail = /\S+@\S+\.\S+/.test(email);
    // const isValidPassword =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //     password,
    //   );

    // if (!isValidEmail || !isValidPassword) {
    //   setErrorMessage("Invalid email or password format.");
    //   return;
    // }
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        firstname,
        lastname,
        email,
        password,
        avatar,
      });
      setSuccessMessage("Account created successfully!");
      setErrorMessage("");

      setCurrentUser(response.data);
    } catch (err) {
      setErrorMessage("An error occurred while creating your account.");
    } finally {
      setIsLoading(false);
    }
  };
  const signOut = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signIn,
        signUp,
        signOut,
        token,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        setCurrentUser,
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
