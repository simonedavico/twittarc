import { createTweet, getTweets } from "./api.js";

/**
 * Main render function
 */
async function render(payload) {
  if (payload.error === "not_authorized") {
    console.log("not authorized");
    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = `<h1>Welcome to Twittarc</h1> <a href=${payload.href}>${payload.message}</a>`;
    return;
  }

  let html = `
    <div style="display: flex; align-items: center; flex: 0 1 auto;">
      <h2>Tweets</h2>
      <a style="margin-left: auto" href=/logout>logout</a> <br>
    </div>
    <input type=text id="new-tweet" placeholder="tweet something...">
  `;

  for (const tweet of payload.tweets) {
    html += `<li>${tweet.accountId}: ${tweet.content}</li>`;
  }

  // render markup
  let main = document.getElementsByTagName("main")[0];
  main.innerHTML = html;

  // listen for enter
  let text = document.getElementById("new-tweet");
  text.addEventListener("keyup", enter);
  text.focus();
}

/** create a tweet */
async function enter(event) {
  if (event.key === "Enter") {
    let value = event.target.value;
    await createTweet({ content: value });
    const tweets = await getTweets();
    await render(tweets);
  }
}

// run the program
try {
  (async function main() {
    let res = await getTweets();
    await render(res);
  })();
} catch (err) {
  console.log("Whoops", err);
}
