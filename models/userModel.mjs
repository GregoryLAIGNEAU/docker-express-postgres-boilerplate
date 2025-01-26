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
      (firstname, lastname, email, password_hash, activation_token_hash)
    VALUES 
      (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${activationTokenHash})
  `;
}

export { createUser };
