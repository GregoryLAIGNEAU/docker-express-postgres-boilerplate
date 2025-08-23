import jwt from "jsonwebtoken";
import crypto from "crypto";
import { isProduction } from "./envUtil.mjs";
import { accessCookieOptions } from "../config/jwtCookieOptions.mjs";

export function generateAccessToken(userId) {
  const payload = { sub: userId, sid: crypto.randomUUID() };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export function setAccessCookie(res, accessToken) {
  res.cookie(
    isProduction ? "__Host-access_token" : "access_token",
    accessToken,
    accessCookieOptions
  );
}