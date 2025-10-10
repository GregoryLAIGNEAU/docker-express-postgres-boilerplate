import { APP_CONFIG } from "#config/envConfig.mjs";
import { transporter } from "#config/mailerConfig.mjs";
import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";

export const sendActivationEmail = async (email, activationToken) => {
  const activationLink = `${APP_CONFIG.BASE_URL}/api/v1/auth/register/activate?token=${activationToken}`;

  const mailOptions = {
    to: email,
    subject: "Activate Your Account",
    text: `
      Hi,

      Thank you for registering with us. To complete your account activation, please visit the following link:

      ${activationLink}

      If you did not create an account with us, you can ignore this email.

      Thank you
    `,
    html: `
      <p>Hi,</p>
      <p>Thank you for registering with us. To complete your account activation, please click the button below:</p>
      <p><a href="${activationLink}" rel="noreferrer">Activate Your Account</a></p>
      <p>If you did not create an account with us, you can ignore this email.</p>
      <p>Thank you</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  const resetPasswordLink = `${APP_CONFIG.BASE_URL}/api/v1/auth/reset-password/reset?token=${resetPasswordToken}`;

  const mailOptions = {
    to: email,
    subject: "Reset Your Password",
    text: `
      Hi,

      You recently requested to reset your password. Click the link below to reset it:

      ${resetPasswordLink}

      If you did not request a password reset, you can safely ignore this email.

      Note: This link will expire in ${TOKEN_CONFIG.RESET_PASSWORD_TOKEN_EXPIRY_MINUTES} minutes.

      Thank you
    `,
    html: `
      <p>Hi,</p>
      <p>You recently requested to reset your password. Click the button below to reset it:</p>
      <p><a href="${resetPasswordLink}" rel="noreferrer">Reset Password</a></p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>Note: This link will expire in ${TOKEN_CONFIG.RESET_PASSWORD_TOKEN_EXPIRY_MINUTES} minutes.</p>
      <p>Thank you,</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
