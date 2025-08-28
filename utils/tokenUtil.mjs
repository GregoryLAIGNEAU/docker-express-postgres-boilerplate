import { createHash, randomBytes, randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

const generateToken = () => {
  return randomBytes(32).toString("hex");
};

const hashToken = (token) => {
  return createHash("sha256").update(token).digest("hex");
};

function generateJwtToken(userId, secret, expiresIn) {
  const payload = { sub: userId, sid: randomUUID() };

  return jwt.sign(payload, secret, { expiresIn });
}

export { generateJwtToken, generateToken, hashToken };
