import { upsertRefreshToken } from "#models/refreshTokenModel.mjs";
import {
  clearAccessCookie,
  clearRefreshCookie,
  setAccessCookie,
  setRefreshCookie,
} from "#utilities/cookieUtility.mjs";
import { generateJwtToken, hashToken } from "#utilities/tokenUtility.mjs";

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

  await upsertRefreshToken(userId, tokenHash, expiresAt);

  setRefreshCookie(res, refreshToken);
}

export const clearAuthCookies = (res) => {
  clearAccessCookie(res);
  clearRefreshCookie(res);
};
