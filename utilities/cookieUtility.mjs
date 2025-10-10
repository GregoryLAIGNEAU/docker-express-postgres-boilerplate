import { accessCookieOptions, refreshCookieOptions } from "#config/jwtCookieConfig.mjs";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "#constants/cookieConstant.mjs";

export const setAccessCookie = (res, accessToken) =>
  res.cookie(ACCESS_COOKIE_NAME, accessToken, accessCookieOptions);

export const setRefreshCookie = (res, refreshToken) =>
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

export const clearAccessCookie = (res) =>
  res.clearCookie(ACCESS_COOKIE_NAME, accessCookieOptions); 

export const clearRefreshCookie = (res) =>
  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions);

