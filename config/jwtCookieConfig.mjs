import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";
import { SECURITY_ENV } from "./envConfig.mjs";

export const accessCookieOptions = {
  httpOnly: true,
  secure: SECURITY_ENV.COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: TOKEN_CONFIG.ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: SECURITY_ENV.COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: TOKEN_CONFIG.REFRESH_TOKEN_MAX_AGE,
};
