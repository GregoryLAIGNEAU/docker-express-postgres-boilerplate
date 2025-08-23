import jwt from "jsonwebtoken";
import crypto from "crypto";

export function generateAccessToken(userId) {
  const payload = { sub: userId, sid: crypto.randomUUID() };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}