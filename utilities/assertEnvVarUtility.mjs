export function requireEnvVar(name, parser = String) {
  const raw = process.env[name];

  if (!raw) {
    throw new Error(`${name} is not defined in environment variables`);
  }

  return parser(raw);
}
