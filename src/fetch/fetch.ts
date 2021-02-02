export class Fetch {
  _fetch;

  constructor() {
    this._fetch = globalThis.fetch;
  }

  async fetchJson(
    url: string | Request | URL,
    options?: RequestInit,
  ): Promise<any> {
    const fetchResult = await this._fetch(url, options);

    if (!fetchResult.ok || fetchResult.status > 299) {
      const textResult = await fetchResult.text();
      throw new Error(
        `Failed to fetch. Status Code: ${fetchResult.status} - ${textResult}`,
      );
    }

    try {
      const body = await fetchResult.json();
      return body;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse response");
    }
  }
}
