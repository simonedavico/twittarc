import arc, { HttpHandler } from "@architect/functions";
import github from "./github";

/**
 * POST /login
 *
 * Authenticates against GitHub
 */
const authenticate: HttpHandler = async (req) => {
  if (req.queryStringParameters.code) {
    const account = await github({
      code: req.queryStringParameters.code,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUri: process.env.GITHUB_REDIRECT,
    });
    return {
      statusCode: 302,
      session: { account },
      location: "/tweets",
    };
  }

  return {
    statusCode: 302,
    location: "/?authorized=false",
  };
};

export const handler = arc.http.async(authenticate);
