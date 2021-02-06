import { Cookie, CookieJar, wrapFetch } from "another_cookiejar/mod.ts";

export interface WordpressPost {
  title?: string;
  content: string;
  publishDate: string;
}

export async function createPost(
  { cookie, post }: { cookie: Cookie; post: WordpressPost },
) {
  const cookieJar = new CookieJar([cookie]);

  const result = wrapFetch({ cookieJar })(
    "https://public-api.wordpress.com/wp/v2/sites/188455061/posts/68?_envelope=1&environment-id=production&_gutenberg_nonce=c0d2e5fb3f&_locale=user",
    {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization":
          "X-WPCOOKIE 9214fed6c0078ac8a724fd56b00cece3:0:https://parentingomg.wordpress.com",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
      },
      "referrer": "https://public-api.wordpress.com/wp-admin/rest-proxy/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": JSON.stringify({
        title: post.title || "",
        content_raw: post.content,
        date: post.publishDate,
      }),
      "method": "PUT",
      "mode": "cors",
      "credentials": "include",
    },
  );

  console.log("result.ok", result.ok);
  if (!result.ok) {
    console.log(await result.text());
    throw new Error("Network error");
  }
  console.log("response body", await result.json());
}
