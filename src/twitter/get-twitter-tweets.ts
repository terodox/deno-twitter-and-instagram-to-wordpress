import { config } from "dotenv/mod.ts";
import { fetchJson } from "../fetch/mod.ts";

export interface Tweet {
  text: string;
}

export async function getTwitterTweets(username: string): Promise<Tweet[]> {
  const env = config();
  const bearer = env.TWITTER_BEARER;

  const results = await getTimeline({ bearer, username });

  return results.data.map((tweet: any) => ({
    text: tweet.text,
  }));
}

async function getUserId(
  { bearer, username }: { bearer: string; username: string },
) {
  const url = new URL(
    "/1.1/users/lookup.json",
    "https://api.twitter.com",
  );
  url.searchParams.append("screen_name", username);

  const result = await fetchJson(url, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  return result[0].id_str;
}

async function getTimeline(
  { bearer, username }: { bearer: string; username: string },
) {
  const userId = await getUserId({ bearer, username });

  const url = new URL(
    `/2/users/${userId}/tweets`,
    "https://api.twitter.com",
  );
  url.searchParams.append("exclude", "retweets,replies");

  return fetchJson(url, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });
}
