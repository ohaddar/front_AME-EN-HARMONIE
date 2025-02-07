import Cookies from "js-cookie";
import config from "../api/config";
import CryptoJS from "crypto-js";

const { SECRET_KEY } = config;

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (): string | undefined => {
  const encryptedToken = getTokenFromCookie();
  if (encryptedToken == undefined) {
    return undefined;
  }

  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  const exp = getTokenExpiration(decrypted);
  const dateExp = new Date(exp * 1000);
  if (dateExp < new Date()) {
    Cookies.remove("auth_token");
    return undefined;
  }

  return decrypted;
};

const getTokenExpiration = (token: string): number => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp;
};

export const getTokenEmail = (token: string): number => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
};

export const setTokenCookie = (token: string | undefined) => {
  if (token == undefined) {
    throw Error("Token can not be null");
  }

  const encryptedToken = encryptToken(token);
  const exp = getTokenExpiration(token);
  Cookies.set("auth_token", encryptedToken, {
    expires: new Date(exp * 1000),
    secure: true,
    sameSite: "Strict",
  });
};

export const getTokenFromCookie = (): string | undefined => {
  return Cookies.get("auth_token");
};
