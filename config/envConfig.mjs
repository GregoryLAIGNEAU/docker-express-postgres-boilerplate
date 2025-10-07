import { requireEnvVar } from "#utilities/assertEnvVarUtility.mjs";
import { isProduction } from "#utilities/envUtility.mjs";

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

export const PG_HOST = requireEnvVar("PG_HOST");
export const PG_PORT = parseInt(process.env.PG_PORT || "5432", 10);
export const PG_NAME = requireEnvVar("PG_NAME");
export const PG_USERNAME = requireEnvVar("PG_USERNAME");
export const PG_PASSWORD = requireEnvVar("PG_PASSWORD");
export const PG_SSL = process.env.PG_SSL === "true";

export const REDIS_PASSWORD = requireEnvVar("REDIS_PASSWORD");
export const REDIS_HOST = requireEnvVar("REDIS_HOST");
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);
export const REDIS_TLS = isProduction;

export const COOKIE_SECURE = isProduction;
