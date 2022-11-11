import { GardenSection } from "../interface";
import * as db from "../utils/database";

export const fetchAll = async (options?: { where?: { [key: string]: any } }): Promise<{ rows: GardenSection[] }> => {
  const rows = await db.fetch<GardenSection>({
    tableName: "gardensections",
    select: "id, user_id, owner: user_id (*), user: user_id (*), x, y, index, props",
    where: options?.where,
  });
  return { rows };
};

export const fetchById = async ({ id }: { id: number }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    select: "id, user_id, owner: user_id (*), user: user_id (*), x, y, index, props",
    where: { id },
    tableName: "gardensections",
  });

  return { row };
};

export const fetchOne = async (where: { [key: string]: any }): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOne<GardenSection>({
    select: "id, user_id, owner: user_id (*), user: user_id (*), x, y, index, props",
    where,
    tableName: "gardensections",
  });

  return { row };
};

export const fetchCharged = async (): Promise<{ rows: GardenSection[] | null }> => {
  const rows = await db.fetchByRunFn<GardenSection>({ functionName: "find_charged" });
  return { rows };
};

export const fetchHighestPriorities = async (): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOneByRunFn<GardenSection>({ functionName: "find_highest_priority_garden" });
  return { row };
};

export const fetchTheMostEdge = async (): Promise<{ row: GardenSection | null }> => {
  const row = await db.fetchOneByRunFn<GardenSection>({ functionName: "find_the_most_edge_garden" });
  return { row };
};

export const save = async ({ gardenSection }: { gardenSection: GardenSection }) => {
  delete gardenSection.tileProps;
  delete gardenSection.shaderProps;

  return db.save<GardenSection>({
    tableName: "gardensections",
    row: gardenSection,
    select: "id, user_id, owner: user_id (*), user: user_id (*), x, y, index, props",
  });
};

export const update = async (id: number, gardenSection: GardenSection) => {
  delete gardenSection.tileProps;
  delete gardenSection.shaderProps;

  return db.update<GardenSection>({
    id,
    tableName: "gardensections",
    row: gardenSection,
    select: "id, user_id, owner: user_id (*), user: user_id (*), x, y, index, props",
  });
};

export const remove = async (id: number) => {
  return db.remove<GardenSection>({ id, tableName: "gardensections" });
};
