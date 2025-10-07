import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#config/tokenConfig.mjs";
import { COOKIE_SECURE } from "./envConfig.mjs";

export const accessCookieOptions = {
  httpOnly: true,
  secure: COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: COOKIE_SECURE,
  sameSite: "Strict",
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
};
