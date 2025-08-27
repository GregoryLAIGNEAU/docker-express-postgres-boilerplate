import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { isProduction } from "./envUtil.mjs";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../config/jwtCookieOptions.mjs";

export function generateAccessToken(userId) {
  const payload = { sub: userId, sid: randomUUID() };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export function setAccessCookie(res, accessToken) {
  res.cookie(
    isProduction ? "__Host-access_token" : "access_token",
    accessToken,
    accessCookieOptions,
  );
}

export function setRefreshCookie(res, refreshToken) {
  res.cookie(
    isProduction ? "__Host-refresh_token" : "refresh_token",
    refreshToken,
    refreshCookieOptions,
  );
}
