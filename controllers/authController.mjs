import * as argon2 from "argon2";
import asyncHandler from "express-async-handler";
import { sendActivationEmail } from "../mailer/authMailer.mjs";
import { createUser, activateUserAccount } from "../models/userModel.mjs";
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

const getRegisterActivate = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const activationTokenHash = hashToken(token);

  const user = await activateUserAccount(activationTokenHash);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({ success: true });
});

export { postRegister, getRegisterActivate };

