export function requireEnvVar(name, parser = String) {
  const raw = process.env[name];

  if (!raw) {
    throw new Error(`${name} is not defined in environment variables`);
  }

  return parser(raw);
}

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

export { isProduction, isDevelopment };
