import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";
import { upsertRefreshToken } from "#models/refreshTokenModel.mjs";
import { clearAccessCookie, clearCsrfCookie, clearRefreshCookie, setAccessCookie, setRefreshCookie } from "#utilities/cookieUtility.mjs";
import { generateJwtToken, getExpiryDate, hashToken } from "#utilities/tokenUtility.mjs";

export async function issueAuthCookies(res, userId, roleId) {
  const accessToken = generateJwtToken(
    userId,
    roleId,
    TOKEN_CONFIG.ACCESS_TOKEN_SECRET,
    TOKEN_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
  );

  setAccessCookie(res, accessToken);

  const refreshToken = generateJwtToken(
    userId,
    roleId,
    TOKEN_CONFIG.REFRESH_TOKEN_SECRET,
    TOKEN_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
  );
  const tokenHash = hashToken(refreshToken);
  const expiresAt = getExpiryDate(TOKEN_CONFIG.REFRESH_TOKEN_LIFETIME_MS);

  await upsertRefreshToken(userId, tokenHash, expiresAt);

  setRefreshCookie(res, refreshToken);
}

export const clearAuthCookies = (res) => {
  clearAccessCookie(res);
  clearRefreshCookie(res);
  clearCsrfCookie(res);
};
