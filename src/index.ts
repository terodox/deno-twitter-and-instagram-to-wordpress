import { config } from "dotenv/mod.ts";
import { getInstagramPosts } from "./instagram/get-instagram-posts.ts";
import { getTwitterTweets } from "./twitter/get-twitter-tweets.ts";
import { createPost, login } from "./wordpress/mod.ts";

const instagramUsername = "parentingomg.wtf";
const twitterUsername = "parentingomgwtf";

console.log("starting...");
const env = config();
const wordpressUsername = env.WORDPRESS_USERNAME;
const wordpressPassword = env.WORDPRESS_PASSWORD;

// const instagramPosts = await getInstagramPosts(instagramUsername);
// console.log(JSON.stringify(instagramPosts, null, 2));

// const twitterPosts = await getTwitterTweets(twitterUsername);
// console.log(JSON.stringify(twitterPosts, null, 2));

const cookie = await login({
  username: wordpressUsername,
  password: wordpressPassword,
});

await createPost({
  cookie,
  post: {
    title: "TESTING",
    content: "testing this thing out",
    publishDate: new Date().toISOString(),
  },
});

// TODO next steps
// https://developer.wordpress.org/rest-api/reference/posts/#create-a-post
console.log("done...");
