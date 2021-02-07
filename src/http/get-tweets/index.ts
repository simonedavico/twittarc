import ensureAuth from "@architect/shared/ensureAuth";
import arc, { HttpRequest } from "@architect/functions";
import { promisify } from "util";

export const handler = arc.http.async(ensureAuth, tweets);

async function tweets(req: HttpRequest) {
  const tables = await arc.tables();
  const getTweets = promisify(tables.tweets.scan);
  const tweets = await getTweets({});

  return {
    statusCode: 200,
    json: {
      tweets: (tweets && tweets.Items) || [],
    },
  };
}
