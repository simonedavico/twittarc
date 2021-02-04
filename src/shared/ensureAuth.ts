import type { HttpHandler } from "@architect/functions";

const ensureAuth: HttpHandler = async (req) => {
  if (!req.session.account) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT;
    const baseUrl = "https://github.com/login/oauth/authorize";
    const authUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}`;
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
