import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { ACCOUNT_STATUS } from "../constants/accountStatusConstant.mjs";
import { REFRESH_COOKIE_NAME } from "../constants/cookieConstant.mjs";
import { BadRequestError, UnauthorizedError } from "../errors/indexError.mjs";
import {
  sendActivationEmail,
  sendResetPasswordEmail,
} from "../mailer/authMailer.mjs";
import {
  getRefreshTokenByHash,
  revokeRefreshToken,
} from "#models/refreshTokenModel.mjs";
import {
  activateAccount,
  createUser,
  getUserByEmail,
  resetPassword,
  updateResetPasswordToken,
  updateVerificationToken,
  verifyResetPasswordToken,
} from "#models/userModel.mjs";
import {
  clearAuthCookies,
  issueAuthCookies,
} from "../services/authService.mjs";
import { generateToken, hashToken } from "../utilities/tokenUtility.mjs";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resendVerificationValidator,
  resetPasswordValidator,
} from "../validators/authValidator.mjs";

export const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } =
    await registerValidator.validate(req.body);

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
    message: "You have registered successfully",
    email: email,
  });
};

export const getActivateAccount = async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string" || token.length !== 64) {
    throw new BadRequestError(
      "This activation link is invalid or has expired. Please request a new one.",
    );
  }

  const activationTokenHash = hashToken(token);

  const user = await activateAccount(activationTokenHash);

  if (!user) {
    throw new BadRequestError(
      "This activation link is invalid or has expired. Please request a new one.",
    );
  }

  return res
    .status(200)
    .json({ message: "Your account has been activated successfully." });
};

export const postResendVerification = async (req, res) => {
  const { email } = await resendVerificationValidator.validate(req.body);

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(200).json({
      message:
        "If an account exists with that email, a verification link has been sent.",
      email: email,
    });
  }

  if (user.account_status_id !== ACCOUNT_STATUS.pending_verification) {
    throw new BadRequestError(
      "Your account is already activated or cannot be activated.",
    );
  }

  const activationToken = generateToken();
  const activationTokenHash = hashToken(activationToken);

  await updateVerificationToken(user.email, activationTokenHash);

  await sendActivationEmail(user.email, activationToken);

  return res.status(200).json({
    message:
      "If an account exists with that email, a verification link has been sent.",
    email: email,
  });
};

export const postLogin = async (req, res) => {
  const { email, password } = await loginValidator.validate(req.body);

  const user = await getUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const passwordMatch = await argon2.verify(user.password_hash, password);

  if (!passwordMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (user.account_status_id === ACCOUNT_STATUS.pending_verification) {
    throw new BadRequestError(
      "Your email verification is pending. Please verify your email to continue.",
    );
  }

  if (user.account_status_id === ACCOUNT_STATUS.deactivated) {
    throw new BadRequestError(
      "Your account is deactivated. Please contact support for assistance.",
    );
  }

  if (user.account_status_id === ACCOUNT_STATUS.suspended) {
    throw new BadRequestError(
      "Your account is suspended. Please contact support for assistance.",
    );
  }

  await issueAuthCookies(res, user.id);

  return res
    .status(200)
    .json({ message: "You have been logged in successfully" });
};

export const postForgotPassword = async (req, res) => {
  const { email } = await forgotPasswordValidator.validate(req.body);

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
      "If an account exists with that email, a password reset link has been sent.",
    email: email,
  });
};

export const postResetPassword = async (req, res) => {
  const { token } = req.query;
  const { email, password, confirmPassword } =
    await resetPasswordValidator.validate(req.body);

  if (!token || typeof token !== "string" || token.length !== 64) {
    throw new BadRequestError(
      "This password reset link is invalid or has expired. Please request a new one.",
    );
  }

  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Your passwords don't match. Please double-check and try again.",
    );
  }

  const resetPasswordTokenHash = hashToken(token);

  const user = await verifyResetPasswordToken(email, resetPasswordTokenHash);

  if (!user) {
    throw new UnauthorizedError(
      "It seems there was an issue with your password reset request. Please try again or request a new one.",
    );
  }

  const passwordHash = await argon2.hash(password);

  await resetPassword(email, resetPasswordTokenHash, passwordHash);

  res.status(200).json({
    message: "Your password has been reset successfully",
  });
};

export const postRefreshToken = async (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE_NAME];

  if (!refreshToken) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const tokenHash = hashToken(refreshToken);

  const validRefreshToken = await getRefreshTokenByHash(tokenHash);

  if (!validRefreshToken) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  await issueAuthCookies(res, decoded.sub);

  return res.status(200).json({ message: "Tokens refreshed successfully" });
};

export const postLogout = async (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE_NAME];

  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await revokeRefreshToken(tokenHash);
  }

  clearAuthCookies(res);

  res.status(200).json({
    message: "You have been logged out successfully",
  });
};
