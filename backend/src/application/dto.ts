export interface PageQuery {
  cursor: number;
  limit: number;
  q: string;
}

export type PageResult = {
  page: number[];
  nextCursor: number | null;
};
