import { Fetch } from "./fetch.ts";

const fetch = new Fetch();

export const fetchJson = fetch.fetchJson.bind(fetch);
