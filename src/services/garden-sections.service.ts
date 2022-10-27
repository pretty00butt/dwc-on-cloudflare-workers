import { GardenSection } from "../interface";
import * as db from "../utils/database";

export const fetchAll = async (options?: { where?: { [key: string]: any } }): Promise<{ rows: GardenSection[] }> => {
  const rows = await db.fetch<GardenSection>({
    tableName: "gardensections",
    select:
      "id, user_id, owner: user_id (*), user: user_id (*), x, y, width, height, top_garden_id, bottom_garden_id, right_garden_id, left_garden_id, props",
    where: options?.where,
  });
  return { rows };
};

export const fetchById = async ({ id }: { id: number }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    select:
      "id, user_id, owner: user_id (*), user: user_id (*), x, y, width, height, top_garden_id, bottom_garden_id, right_garden_id, left_garden_id, props",
    where: { id },
    tableName: "gardensections",
  });

  return { row };
};

export const fetchOne = async (where: { [key: string]: any }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    select:
      "id, user_id, owner: user_id (*), user: user_id (*), x, y, width, height, top_garden_id, bottom_garden_id, right_garden_id, left_garden_id, props",
    where,
    tableName: "gardensections",
  });

  return { row };
};

export const save = async ({ gardenSection }: { gardenSection: GardenSection }) => {
  return db.save<GardenSection>({
    tableName: "gardensections",
    row: gardenSection,
    select:
      "id, user_id, owner: user_id (*), user: user_id (*), x, y, width, height, top_garden_id, bottom_garden_id, right_garden_id, left_garden_id, props",
  });
};

export const update = async (id: number, gardenSection: GardenSection) => {
  return db.update<GardenSection>({
    id,
    tableName: "gardensections",
    row: gardenSection,
    select:
      "id, user_id, owner: user_id (*), user: user_id (*), x, y, width, height, top_garden_id, bottom_garden_id, right_garden_id, left_garden_id, props",
  });
};

export const remove = async (id: number) => {
  return db.remove<GardenSection>({ id, tableName: "gardensections" });
};
