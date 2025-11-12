/* eslint-disable no-console */
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
    console.warn("🔒 No encrypted token found in cookies");
    return undefined;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      console.error("🔒 Token decryption failed - empty result");
      return undefined;
    }

    const exp = getTokenExpiration(decrypted);
    const dateExp = new Date(exp * 1000);
    const now = new Date();

    // Decode and log the full token payload
    const payload = JSON.parse(atob(decrypted.split(".")[1]));

    console.log("🔒 Token validation:", {
      expires: dateExp.toISOString(),
      now: now.toISOString(),
      isValid: dateExp > now,
      timeRemaining:
        Math.floor((dateExp.getTime() - now.getTime()) / 1000 / 60) +
        " minutes",
    });

    console.log("🔍 JWT Token Payload:", {
      sub: payload.sub,
      roles: payload.roles || payload.authorities || payload.role,
      userId: payload.userId || payload.id,
      iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'N/A',
      exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'N/A',
    });

    if (dateExp < now) {
      console.warn("⏰ Token expired - removing from cookies");
      Cookies.remove("auth_token");
      return undefined;
    }

    // eslint-disable-next-line no-console
    console.log("✅ Token is valid");
    return decrypted;
  } catch (error) {
    console.error("🔒 Error decrypting token:", error);
    return undefined;
  }
};

const getTokenExpiration = (token: string): number => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp;
};

export const getTokenEmail = (token: string): number => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub;
};

export const decodeTokenPayload = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log('🔍 JWT Token Payload:', payload);
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
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
