import { Creature } from "../interface";
import * as db from "../utils/database";

export const fetchAll = async (options?: { where?: { [key: string]: any } }): Promise<{ rows: Creature[] }> => {
  const rows = await db.fetch<Creature>({
    select: "id, owner: user_id (id, username), is_online, appearance, animated_properties",
    tableName: "creatures",
    where: options?.where,
  });
  return { rows };
};

export const fetchById = async ({ id }: { id: number }): Promise<{ row: Creature | null }> => {
  const row = await db.fetchOne<Creature>({
    select: "id, owner: user_id (id, username), is_online, appearance, animated_properties",
    where: { id },
    tableName: "creatures",
  });
  return { row };
};

export const save = async ({ creature }: { creature: Creature }) => {
  return db.save({ tableName: "creatures", row: creature });
};

export const update = async (id: number, creature: Creature) => {
  return db.update<Creature>({ id, tableName: "creatures", row: creature });
};

export const remove = async (id: number) => {
  return db.remove<Creature>({ id, tableName: "creatures" });
};
