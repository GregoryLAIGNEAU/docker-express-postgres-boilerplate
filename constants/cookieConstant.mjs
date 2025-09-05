import { isProduction } from "../utilities/envUtility.mjs";

export const ACCESS_COOKIE_NAME = isProduction ? "__Host-access_token" : "access_token";
export const REFRESH_COOKIE_NAME = isProduction ? "__Host-refresh_token" : "refresh_token";
export const X_CSRF_TOKEN_COOKIE_NAME = isProduction ? "__Host-psifi.x-csrf-token" : "x-csrf-token"