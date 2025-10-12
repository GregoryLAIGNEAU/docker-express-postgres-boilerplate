import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";
import { SECURITY_ENV } from "./envConfig.mjs";

export const accessCookieConfig = {
  httpOnly: true,
  secure: SECURITY_ENV.COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: TOKEN_CONFIG.ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieConfig = {
  httpOnly: true,
  secure: SECURITY_ENV.COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: TOKEN_CONFIG.REFRESH_TOKEN_MAX_AGE,
};

export const csrfCookieConfig = {
  httpOnly: false,
  secure: SECURITY_ENV.COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
};