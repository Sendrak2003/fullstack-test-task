import { request } from "../../../shared/api/http";
import { PAGE_LIMIT } from "../../../shared/config";
import type { PageResult } from "../model/types";

export function fetchPage(path: string, filter: string, cursor: number): Promise<PageResult> {
  const params = new URLSearchParams({
    limit: String(PAGE_LIMIT),
    q: filter,
    cursor: String(cursor),
  });
  return request<PageResult>(`${path}?${params}`);
}
