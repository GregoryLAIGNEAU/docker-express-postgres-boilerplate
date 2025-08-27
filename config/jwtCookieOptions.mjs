import { isProduction } from "../utils/envUtil.mjs";

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "Strict",
  path: "/",
  maxAge: 15 * 60 * 1000
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "Strict",
  path: "/",
  maxAge: 14 * 24 * 60 * 60 * 1000
};