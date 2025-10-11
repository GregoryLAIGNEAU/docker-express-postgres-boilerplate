import { accessCookieConfig, refreshCookieConfig } from "#config/jwtCookieConfig.mjs";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "#constants/cookieConstant.mjs";

export const setAccessCookie = (res, accessToken) =>
  res.cookie(ACCESS_COOKIE_NAME, accessToken, accessCookieConfig);

export const setRefreshCookie = (res, refreshToken) =>
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieConfig);

export const clearAccessCookie = (res) =>
  res.clearCookie(ACCESS_COOKIE_NAME, accessCookieConfig); 

export const clearRefreshCookie = (res) =>
  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieConfig);

