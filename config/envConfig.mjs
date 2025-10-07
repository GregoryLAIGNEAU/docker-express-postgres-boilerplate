import { requireEnvVar } from "#utilities/assertEnvVarUtility.mjs";

export const ACCESS_TOKEN_SECRET = requireEnvVar("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = requireEnvVar("REFRESH_TOKEN_SECRET");
export const CSRF_SECRET = requireEnvVar("CSRF_SECRET");
export const BASE_URL = requireEnvVar("BASE_URL");

export const ACCESS_TOKEN_EXPIRY_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRY_MINUTES || "15", 10);
export const REFRESH_TOKEN_EXPIRY_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS || "14", 10);
export const ACTIVATION_TOKEN_EXPIRY_MINUTES = parseInt(process.env.ACTIVATION_TOKEN_EXPIRY_MINUTES || "15", 10);
export const RESET_PASSWORD_TOKEN_EXPIRY_MINUTES = parseInt(
  process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINUTES || "10",
  10,
);
