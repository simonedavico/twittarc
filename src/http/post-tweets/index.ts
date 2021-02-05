import ensureAuth from "@architect/shared/ensureAuth";
import arc, { HttpRequest } from "@architect/functions";
import { promisify } from "util";

export const handler = arc.http.async(ensureAuth, postTweet);

/**
 * POST /tweets
 */
export async function postTweet(req: HttpRequest) {
  const tables = await arc.tables();
  const saveTweet = promisify(tables.tweets.put);

  const result = await saveTweet({
    accountId: req.session.account.login,
    publishedOn: new Date().toISOString(),
    content: req.body.tweet,
    name: req.session.account.name,
  });

  // TODO: move to get tweets
  // console.log({ result });
  // const allTweets = await scan({});
  // console.log(JSON.stringify(allTweets));

  return {
    statusCode: 201,
    // TODO: should have a location header, but we do not have an API for tweet detail
    json: {
      result,
    },
  };
}
