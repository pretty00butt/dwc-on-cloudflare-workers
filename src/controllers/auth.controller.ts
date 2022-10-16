import { Request } from "itty-router";
import { json } from "itty-router-extras";
import createHttpError from "http-errors";
import httpStatus from "http-status";

import authUtils from "../utils/auth";
import { User, USER_ROLE } from "../interface";
import { fetchByUsername, save } from "../services/users.service";

export const signIn = async ({ content }: Request) => {
  if (!content.username) {
    throw createHttpError(httpStatus.NOT_FOUND, "사용자 이름을 확인해주세요.");
  }

  const { row: user } = await fetchByUsername({ username: content.username }, { withPassword: true });

  if (!user) {
    throw createHttpError(httpStatus.UNAUTHORIZED, "사용자 정보를 찾을 수 없습니다.");
  }

  if (!(await authUtils.comparePassword({ hash: user.password as string, password: content.password }))) {
    throw createHttpError(httpStatus.UNAUTHORIZED, "사용자 비밀번호가 일치하지 않습니다.");
  }

  const accessToken = await authUtils.generateAccessTokenForUser(user);

  user.password = undefined;
  return json({
    ...user,
    gardenSection: user.gardenSection,
    accessToken,
  });
};

export const signUp = async ({ content }: Request) => {
  const { email, username, password } = content;
  if (!(email && username && password)) {
    throw createHttpError(httpStatus.BAD_REQUEST, "사용자이름 혹은 비밀번호를 확인해주세요.");
  }

  const resultWithUsername = await fetchByUsername({ username });
  if (resultWithUsername.row) {
    throw createHttpError(httpStatus.BAD_REQUEST, "이미 존재하는 사용자 이름입니다.");
  }

  const passwordHash = await authUtils.generatePasswordHash(password);
  const user: User = {
    email,
    username,
    password: passwordHash,
    garden_section_id: null,
    role_id: USER_ROLE.USER,
  };

  const { row: _user } = await save({ user });
  _user.password = undefined;

  return json({
    row: _user,
  });
};

export default { signIn, signUp };
