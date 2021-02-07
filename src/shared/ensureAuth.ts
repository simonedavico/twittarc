import jwt from "jsonwebtoken";
import type { HttpHandler } from "@architect/functions";

/**
 * Ensures the session is valid, or includes the URL to perform
 * GitHub OAuth
 */
const ensureAuth: HttpHandler = async (req) => {
  if (!req.session.account) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const baseUrl = "https://github.com/login/oauth/authorize";

    console.log({ appSecret: process.env.APP_SECRET });
    console.log({ githubClientId: process.env.GITHUB_CLIENT_ID });

    // we use this to make sure the request that comes back was
    // initiated by the server
    const state = jwt.sign(
      {
        provider: "github",
      },
      process.env.APP_SECRET,
      { expiresIn: "1 hour" }
    );

    const authUrl = `${baseUrl}?client_id=${clientId}&state=${state}`;

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
