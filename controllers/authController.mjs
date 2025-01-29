import * as argon2 from "argon2";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {
  sendActivationEmail,
  sendResetPasswordEmail,
} from "../mailer/authMailer.mjs";
import {
  createUser,
  activateUserAccount,
  getUserByEmail,
  updateResetPasswordToken,
  verifyResetPasswordToken,
} from "../models/userModel.mjs";
import { UnauthorizedError } from "../errors/indexError.mjs";
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

const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await argon2.verify(user.password_hash, password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.account_status_id === 1) {
    return res.status(400).json({
      message:
        "Your email verification is pending. Please verify your email to continue.",
    });
  }

  if (user.account_status_id === 3) {
    return res.status(400).json({
      message:
        "Your account has been suspended. Please contact support for assistance.",
    });
  }

  const payload = {
    sub: user.id,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: "User logged in", accessToken: accessToken });
});

const postForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (user) {
    const userId = user.id;
    const resetPasswordToken = generateToken();
    const resetPasswordTokenHash = hashToken(resetPasswordToken);

    await updateResetPasswordToken(userId, resetPasswordTokenHash);

    await sendResetPasswordEmail(email, resetPasswordToken);
  }

  res.status(200).json({
    message:
      "If an account exists with that email, a password reset link has been sent",
    email: email,
  });
});

const getResetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const resetPasswordTokenHash = hashToken(token);

  const user = await verifyResetPasswordToken(resetPasswordTokenHash);

  if (!user) {
    throw new UnauthorizedError(
      "Oops! There was an issue with your password reset request. Please try again or request a new link.",
    );
  }

  res.status(200).json({
    message: "Reset token is valid",
  });
});

export {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  getResetPassword,
};
