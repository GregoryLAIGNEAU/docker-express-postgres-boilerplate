import { requireEnvVar } from "#utilities/assertEnvVarUtility.mjs";
import { isProduction } from "#utilities/envUtility.mjs";

export const APP_CONFIG = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  BASE_URL: requireEnvVar("BASE_URL").replace(/\/$/, ""),
};

export const CORS_CONFIG = {
  WHITELIST: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export const LOGGER_CONFIG = { LOG_LEVEL: process.env.LOG_LEVEL || (isProduction ? "http" : "debug") };

export const DB_CONFIG = {
  PG_HOST: requireEnvVar("PG_HOST"),
  PG_PORT: parseInt(process.env.PG_PORT || "5432", 10),
  PG_NAME: requireEnvVar("PG_NAME"),
  PG_USERNAME: requireEnvVar("PG_USERNAME"),
  PG_PASSWORD: requireEnvVar("PG_PASSWORD"),
  PG_SSL: process.env.PG_SSL === "true",
};

export const REDIS_CONFIG = {
  REDIS_HOST: requireEnvVar("REDIS_HOST"),
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  REDIS_PASSWORD: requireEnvVar("REDIS_PASSWORD"),
  REDIS_TLS: isProduction,
};

export const SMTP_CONFIG = {
  SMTP_HOST: requireEnvVar("SMTP_HOST"),
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USERNAME: requireEnvVar("SMTP_USERNAME"),
  SMTP_PASSWORD: requireEnvVar("SMTP_PASSWORD"),
  SMTP_SENDER_EMAIL: requireEnvVar("SMTP_SENDER_EMAIL"),
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || parseInt(process.env.SMTP_PORT || "587", 10) === 465,
};

export const TOKEN_ENV = {
  ACCESS_TOKEN_SECRET: requireEnvVar("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY_MINUTES: parseInt(process.env.ACCESS_TOKEN_EXPIRY_MINUTES || "15", 10),
  REFRESH_TOKEN_SECRET: requireEnvVar("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY_DAYS: parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS || "14", 10),
  ACTIVATION_TOKEN_EXPIRY_MINUTES: parseInt(process.env.ACTIVATION_TOKEN_EXPIRY_MINUTES || "15", 10),
  RESET_PASSWORD_TOKEN_EXPIRY_MINUTES: parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINUTES || "10", 10),
};

export const SECURITY_ENV = { CSRF_SECRET: requireEnvVar("CSRF_SECRET"), COOKIE_SECURE: isProduction };
