import { Request } from "itty-router";
import { json } from "itty-router-extras";

import { fetchLatest, save as saveWeather } from "../services/weather.service";

export const findLatest = async () => {
  const { row } = await fetchLatest();
  return json({ row });
};

export const save = async ({ content }: Request) => {
  const { row } = await saveWeather({ weather: content });
  return json({ row });
};

export default {
  findLatest,
  save,
};
