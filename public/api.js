/**
 * POST /tweets
 */
export async function createTweet(tweet) {
  let req = await fetch("/tweets", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ tweet }),
  });
  return req.json();
}

/**
 * GET /tweets
 */
export async function getTweets() {
  let req = await fetch("/tweets");
  return req.json();
}
