import {
  assertEquals,
  assertMatch,
} from "testing/asserts.ts";
import { Fetch } from "./fetch.ts";

let fetchArgs: any[] = [];

Deno.test("should use passed url for request", async () => {
  const fetch = setup({});
  const url = "https://hello.world";

  await fetch.fetchJson(url);

  assertEquals(fetchArgs[0], url);
});

Deno.test("should use passed options for request", async () => {
  const fetch = setup({});
  const url = "https://hello.world";
  const options = { headers: { some: "options" } };

  await fetch.fetchJson(url, options);

  assertEquals(fetchArgs[1], options);
});

Deno.test("should fail if result is not ok", async () => {
  const fetch = setup({ okResponse: false });

  try {
    await fetch.fetchJson("https://failure");
    throw new Error("This should not resolve");
  } catch (error) {
    assertMatch(error.message, /Failed to fetch/i);
  }
});

Deno.test("should fail if statusCode greater than 200", async () => {
  const fetch = setup({ statusCode: 400 });

  try {
    await fetch.fetchJson("https://failure");
    throw new Error("This should not resolve");
  } catch (error) {
    assertMatch(error.message, /Failed to fetch/i);
  }
});

Deno.test("should fail parsing body fails", async () => {
  const fetch = setup({
    okResponse: true,
    jsonFunction: () => {
      throw new Error("boooom");
    },
  });

  try {
    await fetch.fetchJson("https://failure");
    throw new Error("This should not resolve");
  } catch (error) {
    assertMatch(error.message, /Failed to parse response/i);
  }
});

Deno.test("should return json parsed response", async () => {
  const fetch = setup({
    okResponse: true,
    jsonFunction: () => {
      throw new Error("boooom");
    },
  });

  try {
    await fetch.fetchJson("https://failure");
    throw new Error("This should not resolve");
  } catch (error) {
    assertMatch(error.message, /Failed to parse response/i);
  }
});

function setup(
  {
    okResponse = true,
    statusCode = 200,
    jsonFunction = () => {},
  },
) {
  const fetch = new Fetch();

  fetch._fetch = <any> ((...args: any[]) => {
    fetchArgs = args;
    return {
      ok: okResponse,
      json: jsonFunction,
      status: statusCode,
      text: () => {},
    };
  });

  return fetch;
}
