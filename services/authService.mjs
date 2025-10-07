import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_LIFETIME_MS,
  REFRESH_TOKEN_SECRET,
} from "#config/tokenConfig.mjs";
import { upsertRefreshToken } from "#models/refreshTokenModel.mjs";
import { clearAccessCookie, clearRefreshCookie, setAccessCookie, setRefreshCookie } from "#utilities/cookieUtility.mjs";
import { generateExpiry, generateJwtToken, hashToken } from "#utilities/tokenUtility.mjs";

export async function issueAuthCookies(res, userId, roleId) {
  const accessToken = generateJwtToken(userId, roleId, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN);

  setAccessCookie(res, accessToken);

  const refreshToken = generateJwtToken(userId, roleId, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN);
  const tokenHash = hashToken(refreshToken);
  const expiresAt = generateExpiry(REFRESH_TOKEN_LIFETIME_MS);

  await upsertRefreshToken(userId, tokenHash, expiresAt);

  setRefreshCookie(res, refreshToken);
}

export const clearAuthCookies = (res) => {
  clearAccessCookie(res);
  clearRefreshCookie(res);
};
