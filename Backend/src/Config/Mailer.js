import nodemailer from "nodemailer";
import config from "./Index.js";

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.mail.user,
      clientId: config.mail.clientId,
      clientSecret: config.mail.clientSecret,
      refreshToken: config.mail.refreshToken,
    },
  });

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  return transporter.sendMail({
    from: `"Auth System" <${config.mail.user}>`,
    to,
    subject,
    html,
  });
};

export default createTransporter;