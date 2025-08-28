import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  sendActivationEmail,
  sendResetPasswordEmail,
} from "../mailer/authMailer.mjs";
import {
  createUser,
  activateAccount,
  getUserByEmail,
  updateResetPasswordToken,
  verifyResetPasswordToken,
  resetPassword,
} from "../models/userModel.mjs";
import { UnauthorizedError, BadRequestError } from "../errors/indexError.mjs";
import { generateToken, hashToken } from "../utils/tokenUtil.mjs";
import { isProduction } from "../utils/envUtil.mjs";
import { accessCookieOptions } from "../config/jwtCookieOptions.mjs";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
} from "../validators/authValidator.mjs";
import { getRefreshTokenByHash } from "../models/refreshTokenModel.mjs";
import { issueAuthCookies } from "../services/authService.mjs";
import { REFRESH_COOKIE_NAME } from "../utils/cookieUtil.mjs";

const postRegister = async (req, res) => {
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
    message: "User registered successfully",
    email: email,
  });
};

const getActivateAccount = async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string" || token.length !== 64) {
    return res.status(400).json({ success: false });
  }

  const activationTokenHash = hashToken(token);

  const user = await activateAccount(activationTokenHash);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({ success: true });
};

const postLogin = async (req, res) => {
  const { email, password } = await loginValidator.validate(req.body);

  const user = await getUserByEmail(email);
  const ACCOUNT_STATUS = Object.freeze({
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

  if (user.account_status_id === ACCOUNT_STATUS.pending_verification) {
    return res.status(400).json({
      message:
        "Your email verification is pending. Please verify your email to continue.",
    });
  }

  if (user.account_status_id === ACCOUNT_STATUS.suspended) {
    return res.status(400).json({
      message:
        "Your account has been suspended. Please contact support for assistance.",
    });
  }

  await issueAuthCookies(res, user.id);

  return res.status(200).json({ message: "User logged in" });
};

const postForgotPassword = async (req, res) => {
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
      "If an account exists with that email, a password reset link has been sent",
    email: email,
  });
};

const postResetPassword = async (req, res) => {
  const { token } = req.query;
  const { email, password, confirmPassword } =
    await resetPasswordValidator.validate(req.body);

  if (!token || typeof token !== "string" || token.length !== 64) {
    throw new UnauthorizedError(
      "Oops! It seems there was an issue with your password reset request. Please try again or request a new link.",
    );
  }

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

const postRefreshToken = async (req, res) => {
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

  return res.json({ message: "Tokens refreshed" });
};

const postLogout = async (req, res) => {
  const cookieName = isProduction ? "__Host-access_token" : "access_token";

  res.clearCookie(cookieName, accessCookieOptions);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export {
  postRegister,
  getActivateAccount,
  postLogin,
  postForgotPassword,
  postResetPassword,
  postLogout,
  postRefreshToken,
};
