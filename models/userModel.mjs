import sql from "../db/sql.mjs";

async function createUser(
  firstName,
  lastName,
  email,
  passwordHash,
  activationTokenHash,
) {
  await sql`
    INSERT INTO users 
      (firstname, lastname, email, password_hash, activation_token_hash, activation_token_hash_expires_at)
    VALUES 
      (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${activationTokenHash}, NOW() + interval '15 minutes')
  `;
}

async function activateUserAccount(activationTokenHash) {
  const result = await sql`
    UPDATE users
    SET 
      user_status_id = 2, 
      activation_token_hash = NULL, 
      activation_token_hash_expires_at = NULL
    WHERE 
      activation_token_hash = ${activationTokenHash} 
      AND activation_token_hash_expires_at > NOW()
    RETURNING *;
  `;

  return result.length > 0;
}

async function getUserByEmail(email) {
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  return user;
}

async function getUserById(id) {
  const [user] = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;

  return user;
}

async function updateResetPasswordToken(id, resetPasswordTokenHash) {
  await sql`
    UPDATE users 
    SET 
      reset_password_token_hash = ${resetPasswordTokenHash}, 
      reset_password_token_hash_expires_at = NOW() + interval '15 minutes' 
    WHERE id = ${id}
  `;
}

async function verifyResetPasswordToken(resetPasswordTokenHash) {
  const [user] = await sql`
    SELECT * 
    FROM users 
    WHERE 
      reset_password_token_hash = ${resetPasswordTokenHash}
      AND reset_password_token_hash_expires_at > NOW()
  `;

  return user;
}

async function resetPassword(email, resetPasswordTokenHash, passwordHash) {
  const result = await sql`
    UPDATE users 
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

export {
  createUser,
  activateUserAccount,
  getUserByEmail,
  getUserById,
  updateResetPasswordToken,
  verifyResetPasswordToken,
  resetPassword,
};
