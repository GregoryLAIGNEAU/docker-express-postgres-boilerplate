import { readSecret, requireEnvVar } from "#utilities/assertEnvVarUtility.mjs";
import { getRequiredEnv, isProduction } from "#utilities/envUtility.mjs";

export const APP_CONFIG = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  BASE_URL: getRequiredEnv("BASE_URL").replace(/\/$/, ""),
};

export const CORS_CONFIG = {
  WHITELIST: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export const LOGGER_CONFIG = { LOG_LEVEL: process.env.LOG_LEVEL || (isProduction ? "http" : "debug") };

export const DB_CONFIG = {
  PG_HOST: getRequiredEnv("PG_HOST"),
  PG_PORT: parseInt(process.env.PG_PORT || "5432", 10),
  PG_NAME: getRequiredEnv("PG_NAME"),
  PG_USERNAME: getRequiredEnv("PG_USERNAME"),
  PG_PASSWORD: readSecret("db_password"),
  PG_SSL: process.env.PG_SSL === "true",
};

export const REDIS_CONFIG = {
  REDIS_USER: getRequiredEnv("REDIS_USER"),
  REDIS_HOST: getRequiredEnv("REDIS_HOST"),
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  REDIS_PASSWORD: readSecret("redis_password"),
  REDIS_TLS: isProduction,
};

export const SMTP_CONFIG = {
  SMTP_HOST: getRequiredEnv("SMTP_HOST"),
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_USERNAME: getRequiredEnv("SMTP_USERNAME"),
  SMTP_PASSWORD: readSecret("smtp_password"),
  SMTP_SENDER_EMAIL: getRequiredEnv("SMTP_SENDER_EMAIL"),
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || parseInt(process.env.SMTP_PORT || "587", 10) === 465,
};

export const TOKEN_ENV = {
  ACCESS_TOKEN_SECRET: readSecret("access_token_secret"),
  ACCESS_TOKEN_EXPIRY_MINUTES: parseInt(process.env.ACCESS_TOKEN_EXPIRY_MINUTES || "15", 10),
  REFRESH_TOKEN_SECRET: readSecret("refresh_token_secret"),
  REFRESH_TOKEN_EXPIRY_DAYS: parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS || "14", 10),
  ACTIVATION_TOKEN_EXPIRY_MINUTES: parseInt(process.env.ACTIVATION_TOKEN_EXPIRY_MINUTES || "15", 10),
  RESET_PASSWORD_TOKEN_EXPIRY_MINUTES: parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINUTES || "10", 10),
};

export const SECURITY_ENV = { CSRF_SECRET: readSecret("csrf_secret"), COOKIE_SECURE: isProduction };
