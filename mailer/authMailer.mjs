import transporter from "../config/mailerConfig.mjs";

const sendActivationEmail = async (email, activationToken) => {
  const activationLink = `${process.env.BASE_URL}/register/activate?token=${activationToken}`;

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

export { sendActivationEmail };
