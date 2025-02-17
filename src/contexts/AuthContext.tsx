import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User, UserLogin, UserRegister } from "../types/types";
import Cookies from "js-cookie";
import ApiClient from "../api/apiClient";
import {
  decryptToken,
  getTokenEmail,
  getTokenFromCookie,
  setTokenCookie,
} from "../utils/token-helper";
import { LoadingContext } from "./LoadingContext";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { setLoading } = useContext(LoadingContext);

  const apiClient = ApiClient(false);

  const signIn = async (email: string, password: string) => {
    setErrorMessage("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("L'adresse e-mail et le mot de passe sont requis.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post<User, UserLogin>("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser(response.data);
      } else {
        setErrorMessage("Échec de la connexion.");
      }
    } catch (err) {
      console.error("Error during signin:", err);
      if (axios.isAxiosError(err)) {
        setErrorMessage(
          err.response?.status === 401
            ? "E-mail ou mot de passe incorrect."
            : "Une erreur est survenue lors de la connexion.",
        );
      }
    } finally {
      setLoading(false);
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

    setLoading(true);

    try {
      const response = await apiClient.post<User, UserRegister>(
        "/auth/register",
        {
          firstname,
          lastname,
          email,
          password,
          avatar,
        },
      );

      if (response.data.token) {
        setTokenCookie(response.data.token);
        setCurrentUser(response.data);
        setErrorMessage("");

        setSuccessMessage("Compte créé avec succès !");
      } else {
        setErrorMessage("Échec de la création du compte.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      if (axios.isAxiosError(err)) {
        setErrorMessage(
          err.response?.status === 409
            ? "Cet e-mail est déjà utilisé."
            : "Une erreur est survenue lors de la création du compte.",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const signOut = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      setLoading(true);
      setTimeout(() => {
        setCurrentUser(null);
        Cookies.remove("auth_token");
        setLoading(false);
      }, 1000);
    }
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
        signIn,
        signUp,
        signOut,
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
