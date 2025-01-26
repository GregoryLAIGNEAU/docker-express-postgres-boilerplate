import * as argon2 from "argon2";
import asyncHandler from "express-async-handler";
import { sendActivationEmail } from "../mailer/authMailer.mjs";
import { createUser } from "../models/userModel.mjs";
import { generateToken, hashToken } from "../utils/tokenUtil.mjs";

const postRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await argon2.hash(password);

  const activationToken = generateToken();
  const activationTokenHash = hashToken(activationToken);

  await createUser(
    firstName,
    lastName,
    email,
    passwordHash,
    activationTokenHash,
  );

  await sendActivationEmail(email, activationToken);

  res.status(201).json({
    message: "User registered successfully",
    email: email,
  });
});

export { postRegister };
