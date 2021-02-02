import { fetchJson } from "../fetch/mod.ts";

export interface InstagramPost {
  image: URL;
  caption: string;
}

export async function getInstagramPosts(
  username: string,
): Promise<InstagramPost[]> {
  console.log("Fetching for user:", username);
  const result = await fetchJson(
    `https://www.instagram.com/${username}/?__a=1`,
    {
      headers: {
        cookie:
          'ig_did=AE1D4AFE-E812-4993-9452-5D8BED8FD906; mid=X81irgAEAAFiOGPG5zeQJl4VpKtn; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; shbid=4804; shbts=1611622093.8795707; rur=RVA; csrftoken=D1zZTBqaFxJIe8mSmJmjk8mTwOBdqBjr; ds_user_id=32128191; sessionid=32128191%3A6aAPDUTI7YpMuY%3A17; fbsr_124024574287414=C1JwaOCzfNaAyZzpAU7_lUnddE2OUT_QH3ycEh_Tm9E.eyJ1c2VyX2lkIjoiNTAwOTk3MTQ4IiwiY29kZSI6IkFRQmh0T05nVUtDVnZJZkU5Tkc0VmJLcTZlcWRzWDB6SG90MlY1ZE90SXFWUG52V1VaVU83RGV1NHhXM1V0ZU5QeWpoaE5OOU9vMm9ybWJyTmxMcURPRXUxSUNPSUpWYm1tWTZWUk4xYjBJMEwzYmNpUFhwUnFLUmJjTXFWXzJiX2g2VlJTbldtV0cxdmRTd0xjZHpUSF8wYzNxUS1VcDV6MUFPLTJMZGxpZXYyWGdUcXJqRHFNZVlyMnBTc0dCb1AweGpZYUxWMDhTRFZvUlBVejE3OENqdkF0N0d1dVRfZlJpSUxHUlpQd21CQlY5V0I0MTlmTGtmRDhNeXZQNFozakJTNTRKVlQ4dktaQVk2ajdaZll5RXpncnFhT1JVU0QyYk9aUmlyZnQ1ZUtPenFfZWJzMjluQllSeTh6bTkxSUpRIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUJUM0NmOHFRM29LWkJ6ZmFPRW52R2VSQ3ZSRGhCc0FiY3NhdVhCZ3hPaXpoRTdnV0JlOW9JNXBRZmlYdko1Q2hVVTBSaHhxUThFYU1YUFZ1bUQ3bUhwZGhMTlVhcEZFRTVlclhRS215QmdnMmpVbFZyb05uSmFjNGc1Q1h3NFgwcEhkYVJwZzZKNksyeDBJTENzRERJOG1nNVJGRks5U3VoVDQ2ajFiQzVVdDJTTTBaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjExNjIyODE2fQ; urlgen="{\\"98.217.40.247\\": 7015}:1l4CwC:br3byFS4042ofaimgqZW0IdDcjE"',
      },
    },
  );

  return result.graphql.user.edge_owner_to_timeline_media.edges.map((
    post: any,
  ): InstagramPost => ({
    image: post.node.display_url,
    caption: post.node.edge_media_to_caption.edges[0].node.text,
  }));
}
