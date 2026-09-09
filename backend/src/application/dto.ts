export interface PageQuery {
  cursor: number;
  limit: number;
  q: string;
}

export type PageResult = {
  page: number[];
  nextCursor: number | null;
};

export type ReorderInput = {
  movedId: number;
  afterId: number | null;
};

export type ReorderResult = { id: number } | { error: string };
