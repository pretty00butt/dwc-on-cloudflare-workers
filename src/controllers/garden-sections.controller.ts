import createHttpError from "http-errors";
import httpStatus from "http-status";
import { Request } from "itty-router";
import { json } from "itty-router-extras";

import {
  fetchById,
  fetchAll,
  update as updateGardenSection,
  remove as removeGardenSection,
} from "../services/garden-sections.service";

export const findAll = async () => {
  const { rows } = await fetchAll();
  return json({ rows });
};

export const findById = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "가든 id를 확인해주세요.");
  }

  const { row } = await fetchById({ id: Number(params.id) });

  return json({ row });
};

export const update = async ({ content, params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "가든 id를 확인해주세요.");
  }

  const { rows } = await updateGardenSection(Number(params.id), content);
  return json({ rows });
};

export const remove = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "가든 id를 확인해주세요.");
  }

  await removeGardenSection(Number(params.id));

  return json({});
};

export default {
  findAll,
  findById,
  update,
  remove,
};
