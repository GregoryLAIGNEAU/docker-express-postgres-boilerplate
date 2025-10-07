import { ACTIVATION_TOKEN_EXPIRY_MS, RESET_PASSWORD_TOKEN_EXPIRY_MS } from "#config/tokenConfig.mjs";
import { sql } from "#database/sql.mjs";
import { getExpiryDate } from "#utilities/tokenUtility.mjs";

export async function createUser(firstName, lastName, email, passwordHash, activationTokenHash) {
  const activationTokenHashExpiresAt = getExpiryDate(ACTIVATION_TOKEN_EXPIRY_MS);

  await sql`
    INSERT INTO auth.users 
      (firstname, lastname, email, password_hash, activation_token_hash, activation_token_hash_expires_at)
    VALUES 
      (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${activationTokenHash}, ${activationTokenHashExpiresAt})
  `;
}

export async function activateAccount(activationTokenHash) {
  const result = await sql`
    UPDATE auth.users
    SET 
      account_status_id = 2, 
      activation_token_hash = NULL, 
      activation_token_hash_expires_at = NULL
    WHERE 
      activation_token_hash = ${activationTokenHash} 
      AND activation_token_hash_expires_at > NOW()
    RETURNING *;
  `;

  return result.length > 0;
}

export async function updateVerificationToken(email, activationTokenHash) {
  const activationTokenHashExpiresAt = getExpiryDate(ACTIVATION_TOKEN_EXPIRY_MS);

  const result = await sql`
    UPDATE auth.users
    SET 
      activation_token_hash = ${activationTokenHash},
      activation_token_hash_expires_at = ${activationTokenHashExpiresAt}
    WHERE 
      email = ${email} 
      AND account_status_id = 1
    RETURNING *;
  `;

  return result.length > 0;
}

export async function getUserByEmail(email) {
  const [user] = await sql`
    SELECT * FROM auth.users WHERE email = ${email}
  `;

  return user;
}

export async function getUserById(id) {
  const [user] = await sql`
    SELECT * FROM auth.users WHERE id = ${id}
  `;

  return user;
}

export async function updateUserById(id, user) {
  if (Object.keys(user).length === 0) return null;

  const columns = Object.keys(user);

  const result = await sql`
    UPDATE auth.users
    SET ${sql(user, columns)}, updated_at = NOW()
    WHERE id = ${id}
    returning *
  `;

  return result[0] || null;
}

export async function updateResetPasswordToken(id, resetPasswordTokenHash) {
  const resetPasswordHashExpiresAt = getExpiryDate(RESET_PASSWORD_TOKEN_EXPIRY_MS);

  const result = await sql`
    UPDATE auth.users 
    SET 
      reset_password_token_hash = ${resetPasswordTokenHash}, 
      reset_password_token_hash_expires_at = ${resetPasswordHashExpiresAt}
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0] || null;
}

export async function verifyResetPasswordToken(email, resetPasswordTokenHash) {
  const [user] = await sql`
    SELECT * 
    FROM auth.users 
    WHERE 
      email = ${email}
      AND reset_password_token_hash = ${resetPasswordTokenHash}
      AND reset_password_token_hash_expires_at > NOW()
  `;

  return user;
}

export async function resetPassword(email, resetPasswordTokenHash, passwordHash) {
  const result = await sql`
    UPDATE auth.users 
    SET 
      password_hash = ${passwordHash}, 
      reset_password_token_hash = NULL, 
      reset_password_token_hash_expires_at = NULL, 
      password_updated_at = NOW(), 
      updated_at = NOW() 
    WHERE 
      email = ${email}
      AND reset_password_token_hash = ${resetPasswordTokenHash}
      AND reset_password_token_hash_expires_at > NOW()
  `;

  return result.length > 0;
}
