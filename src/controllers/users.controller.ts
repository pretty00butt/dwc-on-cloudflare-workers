import createHttpError from "http-errors";
import httpStatus from "http-status";
import { Request } from "itty-router";
import { json } from "itty-router-extras";
import { User, USER_ROLE } from "../interface";

import { fetchByUid, fetchById, fetchAll, save as saveUser, update as updateUser } from "../services/users.service";
import * as gardensService from "../services/garden-sections.service";

export const assignGardenSection = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자 id를 확인해주세요.");
  }

  const userId = Number(params.id);

  const { row: _user } = await fetchById({ id: userId });

  if (!_user) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자 id를 확인해주세요.");
  }

  const { row: _garden } = await gardensService.fetchHighestPriorities();
  if (!_garden) {
    throw createHttpError(httpStatus.BAD_REQUEST, "빈 가든이 존재하지 않습니다.");
  }

  const [{ rows: userRows }] = await Promise.all([
    updateUser(userId, {
      ..._user,
      garden_section_id: _garden.id,
    }),
    gardensService.update(_garden.id as number, {
      ..._garden,
      user_id: userId,
    }),
  ]);

  const row = userRows[0];
  _garden.user_id = _user.id;
  _garden.user = _user;
  row.gardenSection = _garden;

  return json({
    row: userRows[0],
  });
};

export const create = async ({ content }: Request) => {
  const { creatureName } = content;

  const user: User = {
    uid: content.uid,
    creatureName,
    garden_section_id: null,
    role_id: USER_ROLE.USER,
  };

  const { row: _user } = await saveUser({ user });

  return json({
    row: _user,
  });
};

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

export const findByUid = async ({ params }: Request) => {
  if (!params?.id) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자 uid를 확인해주세요.");
  }

  console.log("params uid: ", params.id);
  console.log(params.id);
  const { row } = await fetchByUid({ uid: params.id.trim() });

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
  assignGardenSection,
  create,
  findAll,
  findById,
  findByUid,
  update,
};
