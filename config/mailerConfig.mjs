import nodemailer from "nodemailer";
import { SMTP_CONFIG } from "./envConfig.mjs";

export const transporter = nodemailer.createTransport(
  {
    host: SMTP_CONFIG.SMTP_HOST,
    port: SMTP_CONFIG.SMTP_PORT,
    secure: SMTP_CONFIG.SMTP_SECURE,
    auth: {
      user: SMTP_CONFIG.SMTP_USERNAME,
      pass: SMTP_CONFIG.SMTP_PASSWORD,
    },
  },
  { from: SMTP_CONFIG.SMTP_SENDER_EMAIL },
);
