import sql from "../database/sql.mjs";

async function createUser(
  firstName,
  lastName,
  email,
  passwordHash,
  activationTokenHash
) {
  await sql`
    INSERT INTO auth.users 
      (firstname, lastname, email, password_hash, activation_token_hash, activation_token_hash_expires_at)
    VALUES 
      (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${activationTokenHash}, NOW() + interval '15 minutes')
  `;
}

async function activateAccount(activationTokenHash) {
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

async function updateVerificationToken(email, activationTokenHash) {
  const result = await sql`
    UPDATE auth.users
    SET 
      activation_token_hash = ${activationTokenHash},
      activation_token_hash_expires_at = NOW() + INTERVAL '15 minutes'
    WHERE 
      email = ${email} 
      AND account_status_id = 1
    RETURNING *;
  `;

  return result.length > 0;
}

async function getUserByEmail(email) {
  const [user] = await sql`
    SELECT * FROM auth.users WHERE email = ${email}
  `;

  return user;
}

async function getUserById(id) {
  const [user] = await sql`
    SELECT * FROM auth.users WHERE id = ${id}
  `;

  return user;
}

async function updateResetPasswordToken(id, resetPasswordTokenHash) {
  await sql`
    UPDATE auth.users 
    SET 
      reset_password_token_hash = ${resetPasswordTokenHash}, 
      reset_password_token_hash_expires_at = NOW() + interval '15 minutes' 
    WHERE id = ${id}
  `;
}

async function verifyResetPasswordToken(email, resetPasswordTokenHash) {
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

async function resetPassword(email, resetPasswordTokenHash, passwordHash) {
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

export {
  createUser,
  activateAccount,
  updateVerificationToken,
  getUserByEmail,
  getUserById,
  updateResetPasswordToken,
  verifyResetPasswordToken,
  resetPassword,
};
