import arc, { HttpHandler } from "@architect/functions";
import jwt from "jsonwebtoken";
import github from "./github";

/**
 * GET /login
 *
 * Completes the GitHub OAuth flow initiated in the browser
 * by verifying the state query param, obtaining a valid access token
 * and retrieving account info
 */
const authenticate: HttpHandler = async (req) => {
  const { code, state } = req.queryStringParameters;
  if (code && state) {
    return Promise.resolve(jwt.verify(state, process.env.APP_SECRET))
      .then(async () => {
        const account = await github({
          code: req.queryStringParameters.code,
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        });
        return {
          statusCode: 302,
          session: { account },
          location: "/",
        };
      })
      .catch(() => ({
        statusCode: 401,
        body: "Not Authorized",
      }));
  }

  return {
    statusCode: 302,
    location: "/?authorized=false",
  };
};

export const handler = arc.http.async(authenticate);
