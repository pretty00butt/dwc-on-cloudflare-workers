import { User } from "../interface";
import * as db from "../utils/database";

function removePassword(user: User) {
  if (!user) {
    return user;
  }

  delete user.password;
  return user;
}

export const fetchAll = async ({ where }: { where?: { [key: string]: any } }): Promise<{ rows: User[] }> => {
  const rows = await db.fetch<User>({
    select:
      "id, email, username, role: role_id (id, name), creature: creature_id (id, animated_properties, appearance, is_online), gardenSection: garden_section_id (id, x, y, width, height)",
    where,
    tableName: "users",
  });
  return { rows };
};

export const fetchById = async ({ id }: { id: number }): Promise<{ row: User | null }> => {
  const row = await db.fetchOne<User>({
    select: "id, email, username, role: role_id (id, name), gardenSection: garden_section_id (id, x, y, width, height)",
    where: { id },
    tableName: "users",
  });
  return { row };
};

export const fetchByUsername = async (
  { username }: { username: string },
  options?: {
    withPassword?: boolean;
  }
): Promise<{ row: User | null }> => {
  let row = await db.fetchOne<User>({
    select: `id, email, username, ${
      options?.withPassword ? "password," : ""
    } role: role_id (id, name), gardenSection: garden_section_id (id, x, y, width, height)`,
    where: { username },
    tableName: "users",
  });

  row = row && !options?.withPassword ? removePassword(row) : row;

  return { row: row || null };
};

export const fetchUsersWithPagination = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<{ rows: User[]; totalCount: number }> => {
  const result = await db.fetchWithPagination<User>({
    select: `id, email, username, role: role_id (id, name), gardenSection: garden_section_id (id, x, y, width, height)`,
    tableName: "users",
    page,
    pageSize,
  });

  return {
    ...result,
    rows: result.rows.map(removePassword),
  };
};

export const save = async ({ user }: { user: User }) => {
  return db.save({ tableName: "users", row: user });
};

export const update = async (id: number, user: User) => {
  const result = await db.update<User>({ id, tableName: "users", row: user });
  return {
    rows: result.rows.map(removePassword),
  };
};
