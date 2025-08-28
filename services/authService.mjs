import { createRefreshToken } from "../models/refreshTokenModel.mjs";
import { setAccessCookie, setRefreshCookie } from "../utils/cookieUtil.mjs";
import { generateJwtToken, hashToken } from "../utils/tokenUtil.mjs";

export async function issueAuthCookies(res, userId) {
  const accessToken = generateJwtToken(
    userId,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY,
  );

  setAccessCookie(res, accessToken);

  const refreshToken = generateJwtToken(
    userId,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY,
  );

  const tokenHash = hashToken(refreshToken);

  const expiresAt = new Date(
    Date.now() +
      parseInt(process.env.REFRESH_TOKEN_EXPIRY_DAYS, 10) * 24 * 60 * 60 * 1000,
  );

  await createRefreshToken(userId, tokenHash, expiresAt);

  setRefreshCookie(res, refreshToken);
}
