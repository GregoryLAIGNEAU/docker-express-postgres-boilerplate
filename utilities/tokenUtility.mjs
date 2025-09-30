import { createHash, randomBytes, randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

export function generateJwtToken(userId, roleId, secret, expiresIn) {
  const payload = { sub: userId, sid: randomUUID(), role_id: roleId, };

  return jwt.sign(payload, secret, { expiresIn });
}

export const generateToken = () => {
  return randomBytes(32).toString("hex");
};

export const hashToken = (token) => {
  return createHash("sha256").update(token).digest("hex");
};
