import createHttpError from "http-errors";
import httpStatus from "http-status";
import { Request } from "itty-router";
import { json } from "itty-router-extras";
import { Creature } from "../interface";

import {
  fetchById,
  fetchAll,
  remove as removeCreature,
  update as updateCreature,
  save as saveCreature,
} from "../services/creatures.service";

export const findAll = async ({ params }: Request) => {
  const { rows } = await fetchAll({ where: params });
  return json({ rows });
};

export const findById = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "크리쳐 id를 확인해주세요.");
  }

  const { row } = await fetchById({ id: Number(params.id) });

  return json({ row });
};

export const save = async ({ content }: Request) => {
  const { row } = await saveCreature({ creature: content as Creature });
  return json({ row });
};

export const update = async ({ content, params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "크리쳐 id를 확인해주세요.");
  }

  const { rows } = await updateCreature(Number(params.id), content);
  return json({ rows });
};

export const remove = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "크리쳐 id를 확인해주세요.");
  }

  await removeCreature(Number(params.id));

  return json({});
};

export default {
  findAll,
  findById,
  save,
  update,
  remove,
};
