import { isProduction } from "../utils/envUtil.mjs";

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "Strict",
  path: "/",
  maxAge: 15 * 60 * 1000
};