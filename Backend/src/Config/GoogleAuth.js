import { OAuth2Client } from "google-auth-library";
import config from "./Index.js";

const googleClient = new OAuth2Client(config.google.clientId);

export const verifyGoogleToken = async (idToken) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: config.google.clientId,
  });
  return ticket.getPayload(); // { sub, email, name, picture, email_verified }
};

export default googleClient;