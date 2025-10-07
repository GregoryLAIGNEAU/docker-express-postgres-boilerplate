import nodemailer from "nodemailer";

import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SECURE, SMTP_SENDER_EMAIL, SMTP_USERNAME } from "./envConfig.mjs";

export const transporter = nodemailer.createTransport(
  {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  },
  { from: SMTP_SENDER_EMAIL },
);
