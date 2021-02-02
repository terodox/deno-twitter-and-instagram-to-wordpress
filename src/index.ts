import { getInstagramPosts } from "./instagram/get-instagram-posts.ts";
// import { getTwitterPosts } from "./twitter/get-posts";

const instagramUsername = "parentingomg.wtf";
// const twitterUsername = "parentingomgwtf";

(async function () {
  console.log("starting...");
  const instagramPosts = await getInstagramPosts(instagramUsername);
  console.log(instagramPosts);
  // const twitterPosts = await getTwitterPosts(twitterUsername);
  // console.log(twitterPosts);
  console.log("done...");
})().catch(console.error);
