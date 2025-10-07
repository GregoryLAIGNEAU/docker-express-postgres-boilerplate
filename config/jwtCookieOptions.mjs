import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#config/tokenConfig.mjs";
import { isProduction } from "#utilities/envUtility.mjs";

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "Strict",
  path: "/",
  maxAge: ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "Strict",
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
};
