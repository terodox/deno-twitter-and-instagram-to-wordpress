import { getInstagramPosts } from "./instagram/get-instagram-posts.ts";
import { getTwitterTweets } from "./twitter/get-twitter-tweets.ts";

const instagramUsername = "parentingomg.wtf";
const twitterUsername = "parentingomgwtf";

console.log("starting...");

const instagramPosts = await getInstagramPosts(instagramUsername);
console.log(instagramPosts);
const twitterPosts = await getTwitterTweets(twitterUsername);
console.log(twitterPosts);

// TODO next steps
// https://developer.wordpress.org/rest-api/reference/posts/#create-a-post
console.log("done...");
