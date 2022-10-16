import createHttpError from "http-errors";
import httpStatus from "http-status";
import { Request } from "itty-router";
import { json } from "itty-router-extras";
import { User } from "../interface";

import { fetchById, fetchAll, update as updateUser } from "../services/users.service";

export const findAll = async ({ params }: Request) => {
  const { rows } = await fetchAll({ where: params });
  return json({ rows });
};

export const findById = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자 id를 확인해주세요.");
  }

  const { row } = await fetchById({ id: Number(params.id) });

  return json({ row });
};

export const update = async ({ content, params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자 id를 확인해주세요.");
  }

  // remove password field to keep it from an wrong request
  delete content.password;
  const { rows } = await updateUser(Number(params.id), content as User);
  return json({ rows });
};

export default {
  findAll,
  findById,
  update,
};
