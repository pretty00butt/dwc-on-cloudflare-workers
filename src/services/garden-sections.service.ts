import { GardenSection } from "../interface";
import * as db from "../utils/database";

export const fetchAll = async (): Promise<{ rows: GardenSection[] }> => {
  const rows = await db.fetch<GardenSection>({ tableName: "gardensections" });
  return { rows };
};

export const fetchById = async ({ id }: { id: number }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    select: "*",
    where: { id },
    tableName: "gardensections",
  });

  return { row };
};

export const fetchOne = async (where: { [key: string]: any }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    where,
    tableName: "gardensections",
  });

  return { row };
};

export const save = async (gardenSection: GardenSection) => {
  return db.save<GardenSection>({ tableName: "gardensections", row: gardenSection });
};

export const update = async (id: number, gardenSection: GardenSection) => {
  return db.update<GardenSection>({ id, tableName: "gardensections", row: gardenSection });
};

export const remove = async (id: number) => {
  return db.remove<GardenSection>({ id, tableName: "gardensections" });
};
