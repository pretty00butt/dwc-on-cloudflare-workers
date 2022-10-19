import { User, Weather } from "../interface";
import * as db from "../utils/database";

export const fetchLatest = async (): Promise<{ row: Weather }> => {
  const row = await db.fetchOne<Weather>({
    tableName: "weather",
    orderBy: ["created_at", false],
  });

  return { row: row as Weather };
};

export const save = async ({ weather }: { weather: Weather }) => {
  return db.save({ tableName: "weather", row: weather });
};
