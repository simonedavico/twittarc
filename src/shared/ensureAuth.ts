import jwt from "jsonwebtoken";
import type { HttpHandler } from "@architect/functions";

/**
 * Ensures the session is valid, or includes the URL to perform
 * GitHub OAuth
 */
const ensureAuth: HttpHandler = async (req) => {
  if (!req.session.account) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT;
    const baseUrl = "https://github.com/login/oauth/authorize";

    // we use this to make sure the request that comes back was
    // initiated by the server
    const state = jwt.sign(
      {
        provider: "github",
        redirectUri,
      },
      process.env.APP_SECRET,
      { expiresIn: "1 hour" }
    );

    const authUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    return {
      statusCode: 403,
      json: {
        error: "not_authorized",
        message: "Please login with your GitHub account.",
        href: authUrl,
      },
    };
  }
};

export default ensureAuth;
