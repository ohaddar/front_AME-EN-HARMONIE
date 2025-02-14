import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/classes/User";
import {
  AuthContextType,
  useremailAndPassword,
  UserSignUp,
} from "../types/types";
import Cookies from "js-cookie";
import ApiClient from "../api/apiClient";
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiClient = ApiClient(false);

  const signIn = async (email: string, password: string) => {
    setErrorMessage("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("L'adresse e-mail et le mot de passe sont requis.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post<User, useremailAndPassword>(
        "/auth/login",
        { email, password },
      );

      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser(response.data);
      } else {
        setErrorMessage("Échec de la connexion. Aucun token reçu.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.status === 401
          ? "E-mail ou mot de passe incorrect."
          : "Une erreur est survenue lors de la connexion.",
      );
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
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Format d'adresse e-mail invalide.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post<User, UserSignUp>(
        "/auth/register",
        { firstname, lastname, email, password, avatar },
      );

      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser(response.data);
        setSuccessMessage("Compte créé avec succès !");
      } else {
        setErrorMessage("Échec de l'inscription. Aucun token reçu.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.status === 409
          ? "Cet e-mail est déjà utilisé."
          : "Une erreur est survenue lors de la création du compte.",
      );
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
          setCurrentUser((prevUser) => ({ ...prevUser, token }) as User);
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
