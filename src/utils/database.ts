import createError from "http-errors";
import httpStatus from "http-status";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const NOT_FOUND_ERROR_CODE = "PGRST116";

export async function fetch<T>({
  tableName,
  select,
  where,
}: {
  tableName: string;
  select?: string;
  where?: { [key: string]: any };
}): Promise<T[]> {
  const queryBuilder = supabase.from(tableName).select(select || "*");

  if (where) {
    Object.keys(where).forEach((key) => {
      queryBuilder.eq(key, where[key]);
    });
  }

  const { data, error } = await queryBuilder;
  if (error) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return data as T[];
}

export async function fetchOne<T>({
  where,
  select,
  tableName,
  orderBy,
}: {
  where?: { [key: string]: any };
  select?: string;
  tableName: string;
  orderBy?: [string, boolean];
}): Promise<T | null> {
  const queryBuilder = supabase.from(tableName).select(select || "*");

  if (where) {
    Object.keys(where).forEach((key) => {
      queryBuilder.eq(key, where[key]);
    });
  }

  if (orderBy) {
    queryBuilder.order(orderBy[0], { ascending: orderBy[1], nullsFirst: false });
  }

  const { data, error } = await queryBuilder.range(0, 0).single();
  if (error && error.code !== NOT_FOUND_ERROR_CODE) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return data as T;
}

export async function fetchByRunFn<T>({ functionName }: { functionName: string }): Promise<T[] | null> {
  const queryBuilder = supabase.rpc(functionName);

  const { data, error } = await queryBuilder;
  if (error && error.code !== NOT_FOUND_ERROR_CODE) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return data as T[];
}

export async function fetchOneByRunFn<T>({ functionName }: { functionName: string }): Promise<T | null> {
  const queryBuilder = supabase.rpc(functionName);

  const { data, error } = await queryBuilder;
  if (error && error.code !== NOT_FOUND_ERROR_CODE) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return data ? data[0] : null;
}

export async function fetchWithPagination<T>({
  select,
  tableName,
  page,
  pageSize,
}: {
  select?: string;
  tableName: string;
  page: number;
  pageSize: number;
}): Promise<{ rows: T[]; totalCount: number }> {
  const { data, error } = await supabase
    .from(tableName)
    .select(select || "*", { count: "exact" })
    .range((page - 0) * pageSize, page * pageSize);

  if (error) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return { rows: data as T[], totalCount: 0 };
}

export async function save<T>({
  tableName,
  row,
  select,
}: {
  tableName: string;
  row: T;
  select?: string;
}): Promise<{ row: T }> {
  const { data, error } = await supabase
    .from(tableName)
    .insert(row)
    .select(select || "*")
    .single();
  if (error) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return { row: data as T };
}

export async function update<T>({
  id,
  tableName,
  row,
  select,
}: {
  id: number;
  tableName: string;
  row: T;
  select?: string;
}): Promise<{ rows: T[] }> {
  const { error: _error } = await supabase
    .from(tableName)
    .select(select || "*")
    .eq("id", id)
    .single();

  if (_error && _error.code === NOT_FOUND_ERROR_CODE) {
    throw createError(httpStatus.NOT_FOUND, `삭제하려는 정보를 찾을 수 없습니다.`);
  }

  const { data, error } = await supabase.from(tableName).update(row).eq("id", id).select();

  if (error) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return { rows: data as T[] };
}

export async function remove<T>({ id, tableName }: { id: number; tableName: string }): Promise<{}> {
  const { error } = await supabase.from(tableName).delete().eq("id", id);
  if (error) {
    throw createError(httpStatus.INTERNAL_SERVER_ERROR, `DATABASE 연결에 문제가 발생했습니다.\n${error.message}`);
  }

  return {};
}
