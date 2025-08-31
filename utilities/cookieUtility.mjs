import { accessCookieOptions, refreshCookieOptions } from "../config/jwtCookieOptions.mjs";
import { isProduction } from "./envUtility.mjs";

export const ACCESS_COOKIE_NAME = isProduction ? "__Host-access_token" : "access_token";
export const REFRESH_COOKIE_NAME = isProduction ? "__Host-refresh_token" : "refresh_token";

export const setAccessCookie = (res, accessToken) =>
  res.cookie(ACCESS_COOKIE_NAME, accessToken, accessCookieOptions);

export const setRefreshCookie = (res, refreshToken) =>
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

export const clearAccessCookie = (res) =>
  res.clearCookie(ACCESS_COOKIE_NAME, accessCookieOptions); 

export const clearRefreshCookie = (res) =>
  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions);

