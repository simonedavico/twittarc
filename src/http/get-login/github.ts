import tiny from "tiny-json-http";

type GitHubOauthRequest = {
  code: string;
  clientId: string;
  clientSecret: string;
};

// admittedly not the best type, but at least we get autocomplete
type GitHubAccount = {
  token: string;
  name: string;
  login: string;
  id: string;
  url: string;
  avatarUrl: string;
};

async function github(req: GitHubOauthRequest): Promise<GitHubAccount> {
  const result = await tiny.post({
    url: "https://github.com/login/oauth/access_token",
    headers: { Accept: "application/json" },
    data: {
      code: req.code,
      client_id: req.clientId,
      client_secret: req.clientSecret,
    },
  });

  const token = result.body.access_token;

  // use the access token to get the user account
  const user = await tiny.get({
    url: `https://api.github.com/user`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { name, login, id, url, avatar_url } = user.body;

  return {
    token,
    name,
    login,
    id,
    url,
    avatarUrl: avatar_url,
  };
}

export default github;
