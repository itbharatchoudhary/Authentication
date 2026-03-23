import nodemailer from "nodemailer";
import { google } from "googleapis";
import Config from "../Config/Config.js";

const oAuth2Client = new google.auth.OAuth2(
  Config.GOOGLE.CLIENT_ID,
  Config.GOOGLE.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: Config.GOOGLE.REFRESH_TOKEN,
});

const accessToken = await oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: Config.GOOGLE.USER,
    clientId: Config.GOOGLE.CLIENT_ID,
    clientSecret: Config.GOOGLE.CLIENT_SECRET,
    refreshToken: Config.GOOGLE.REFRESH_TOKEN,
    accessToken: accessToken.token,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Authentication" <${Config.GOOGLE.USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};