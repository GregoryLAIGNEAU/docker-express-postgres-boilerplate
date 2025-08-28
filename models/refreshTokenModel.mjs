import sql from "../database/sql.mjs";

export async function createRefreshToken(userId, tokenHash, expiresAt) {
  const result = await sql`
    INSERT INTO auth.refresh_tokens (user_id, token_hash, expires_at)
    VALUES (${userId}, ${tokenHash}, ${expiresAt})
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      token_hash = EXCLUDED.token_hash,
      expires_at = EXCLUDED.expires_at,
      created_at = CURRENT_TIMESTAMP,
      revoked_at = NULL
    RETURNING *;
  `;

  return result[0];
}
