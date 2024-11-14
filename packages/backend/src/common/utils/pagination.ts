import type { ApiReq } from '../http';
import { convertToNumber } from './numbers';

export function extractPaginationParams(query: ApiReq['query']) {
  const { page: pageQuery, limit: limitQuery } = query;
  const page = pageQuery ? convertToNumber(pageQuery as string) : 1;
  const limit = limitQuery ? convertToNumber(limitQuery as string) : 100;

  delete query.page;
  delete query.limit;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export type ApiPaginationParams = ReturnType<typeof extractPaginationParams>;
