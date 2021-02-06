import { Cookie, CookieJar, wrapFetch } from "another_cookiejar/mod.ts";

export async function login(
  { username, password }: { username: string; password: string },
): Promise<Cookie> {
  const WORDPRESS_COM_CLIENT_SECRET =
    "cOaYKdrkgXz8xY7aysv4fU6wL6sK5J8a6ojReEIAPwggsznj4Cb6mW0nffTxtYT8";
  const safeUsername = encodeURIComponent(username);
  const safePassword = encodeURIComponent(password);
  const body =
    `username=${safeUsername}&password=${safePassword}&remember_me=true&redirect_to=https%3A%2F%2Fwordpress.com%2F&client_id=39911&client_secret=${WORDPRESS_COM_CLIENT_SECRET}&domain=`;

  const cookieJar = new CookieJar();
  const result = await wrapFetch({ cookieJar })(
    "https://wordpress.com/wp-login.php?action=login-endpoint",
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua":
          '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
      },
      referrer: "https://wordpress.com/",
      referrerPolicy: "origin",
      body,
      method: "POST",
      mode: "cors", // ?
      credentials: "include",
    },
  );

  if (!result.ok) {
    throw new Error("Failed to login to wordpress - network error");
  }

  const resultBody = await result.json();

  if (resultBody.success !== true) {
    console.error("Failed to login to wordpress", resultBody);
    throw new Error("Failed to login to wordpress");
  }

  const cookie = cookieJar.getCookie({
    name: "wordpress",
  });

  if (cookie === undefined) {
    throw new Error("Failed to get user credentials from cookie");
  }

  return cookie;
}
