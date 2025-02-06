import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/classes/User";
import {
  AuthContextType,
  useremailAndPassword,
  UserSignUp,
} from "../types/types";
import Cookies from "js-cookie";
import ApiClient from "../api/api-client";
import {
  decryptToken,
  getTokenEmail,
  getTokenFromCookie,
  setTokenCookie,
} from "../utils/token-helper";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiClient = ApiClient(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Both email and password are required.");
      setIsLoading(false);
      return;
    }
    const useremailPass: useremailAndPassword = {
      email,
      password,
    };
    try {
      const response = await apiClient.post<User, useremailAndPassword>(
        "/auth/login",
        useremailPass,
      );
      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser({ ...response.data });
      } else {
        setErrorMessage("Login failed. No token received.");
      }
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
    setErrorMessage("");
    setSuccessMessage("");
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
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(
        "Invalid email format. Please enter a valid email address.",
      );
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Invalid password. Must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const userdata: UserSignUp = {
        firstname,
        lastname,
        email,
        password,
        avatar,
      };
      const response = await apiClient.post<User, UserSignUp>(
        "/auth/register",
        userdata,
      );

      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser({ ...response.data });
        setSuccessMessage("Account created successfully!");
      } else {
        setErrorMessage("Sign-up failed. No token received.");
      }
    } catch (err) {
      setErrorMessage("An error occurred while creating your account.");
    } finally {
      setIsLoading(false);
    }
  };
  const signOut = () => {
    setCurrentUser(null);
    Cookies.remove("auth_token");
  };
  useEffect(() => {
    try {
      const encryptedToken = getTokenFromCookie();
      if (encryptedToken) {
        const token = decryptToken();
        if (token) {
          if (currentUser == undefined) {
            const email = getTokenEmail(token);
            console.log("EMMMMMQQQQQIIIKLLL", email);

            apiClient
              .get<User>(`/auth/profile/${email}`)
              .then((res) => {
                setCurrentUser(res.data);
              })
              .catch(() => {
                setCurrentUser(null);
                Cookies.remove("auth_token");
              });
          }
          setCurrentUser((prevUser) => ({ ...prevUser, token } as User));
          console.log(currentUser);
        } else {
          setCurrentUser(null);
        }
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signIn,
        signUp,
        signOut,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        setIsLoading,
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
