import { Twino } from 'https://deno.land/x/twino/src/client.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

export async function getTwitterPosts(username: string) {
    const env = config();

    const twino = new Twino({
        consumer_key: env.TWITTER_API_KEY,
        consumer_secret: env.TWITTER_API_SECRET,
        access_token: env.TWITTER_ACCESS_TOKEN,
        access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const result = await getTimeline(twino, username);
    console.log(result[1]);
}

function getTimeline(twino: Twino, username: string) {
    return new Promise((resolve, reject) => {
        twit.get('statuses/user_timeline', { count: 20, screen_name: username }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
