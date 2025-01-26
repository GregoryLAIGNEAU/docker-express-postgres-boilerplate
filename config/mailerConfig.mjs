import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  { from: process.env.SMTP_SENDER_EMAIL },
);

export default transporter;