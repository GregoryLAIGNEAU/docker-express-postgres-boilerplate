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

export { createUser, activateUserAccount };
