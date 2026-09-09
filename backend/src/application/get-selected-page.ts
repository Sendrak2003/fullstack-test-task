import { ordered } from "../infrastructure/item.js";
import type { PageQuery, PageResult } from "./dto.js";

export const getSelectedPage = ({ cursor, limit, q }: PageQuery): PageResult => {
  const filtered = q ? ordered.filter((id) => String(id).includes(q)) : ordered;
  const page = filtered.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < filtered.length ? cursor + limit : null;
  return { page, nextCursor };
};