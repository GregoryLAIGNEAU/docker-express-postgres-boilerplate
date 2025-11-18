import fs from "node:fs";

export function getRequiredEnv(name, parser = String) {
  const envValue = process.env[name];

  if (envValue == null || envValue === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  try {
    return parser(envValue);
  } catch (err) {
    throw new Error(`Failed to parse environment variable ${name}: ${err.message}`);
  }
}

export function loadSecretFile(name) {
  const secretPath = `/run/secrets/${name}`;

  try {
    return fs.readFileSync(secretPath, "utf8").trim();
  } catch (_err) {
    return null;
  }
}

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

export { isProduction, isDevelopment };
