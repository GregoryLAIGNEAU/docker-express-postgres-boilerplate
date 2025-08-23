import * as argon2 from "argon2";
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
  resetPassword,
} from "../models/userModel.mjs";
import { UnauthorizedError, BadRequestError } from "../errors/indexError.mjs";
import { generateToken, hashToken } from "../utils/tokenUtil.mjs";
import { generateAccessToken } from "../utils/jwtUtils.mjs";

const postRegister = async (req, res) => {
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
};

const getRegisterActivate = async (req, res) => {
  const { token } = req.query;

  const activationTokenHash = hashToken(token);

  const user = await activateUserAccount(activationTokenHash);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({ success: true });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;


  const user = await getUserByEmail(email);
  const USER_STATUS = Object.freeze({
    pending_verification: 1,
    suspended: 3,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await argon2.verify(user.password_hash, password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.user_status_id === USER_STATUS.pending_verification) {
    return res.status(400).json({
      message:
        "Your email verification is pending. Please verify your email to continue.",
    });
  }

  if (user.user_status_id === USER_STATUS.suspended) {
    return res.status(400).json({
      message:
        "Your account has been suspended. Please contact support for assistance.",
    });
  }

  const accessToken = generateAccessToken(user.id);

  return res
    .status(200)
    .json({ message: "User logged in", accessToken: accessToken });
};

const postForgotPassword = async (req, res) => {
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
};

const postResetPassword = async (req, res) => {
  const { token } = req.query;
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Oops! Your passwords don't match. Please double-check and try again.",
    );
  }

  const resetPasswordTokenHash = hashToken(token);

  const user = await verifyResetPasswordToken(email, resetPasswordTokenHash);

  if (!user) {
    throw new UnauthorizedError(
      "Oops! It seems there was an issue with your password reset request. Please try again or request a new link.",
    );
  }

  const passwordHash = await argon2.hash(password);

  await resetPassword(email, resetPasswordTokenHash, passwordHash);

  res.status(200).json({
    message: "Password successfully reset",
  });
};

export {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  postResetPassword,
};
