import createHttpError from "http-errors";
import httpStatus from "http-status";
import { Request } from "itty-router";
import { json } from "itty-router-extras";

import {
  fetchById,
  fetchAll,
  update as updateGardenSection,
  remove as removeGardenSection,
  save as saveGardenSection,
} from "../services/garden-sections.service";

export const create = async ({ content }: Request) => {
  const { row } = await saveGardenSection({ gardenSection: content });

  return json({
    row,
  });
};

export const findAll = async ({ query }: Request) => {
  const { rows } = await fetchAll({ where: query });
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
  create,
  findAll,
  findById,
  update,
  remove,
};
