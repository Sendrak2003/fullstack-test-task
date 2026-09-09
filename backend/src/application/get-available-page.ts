import { MAX_BASE_ID, selected } from "../infrastructure/item.js";
import type { PageQuery, PageResult } from "./dto.js";

export const getAvailablePage = ({ cursor, limit, q }: PageQuery): PageResult => {
    let id = cursor + 1;
    const page: number[] = [];
        while (page.length < limit && id <= MAX_BASE_ID) {
            if (!selected.has(id) && String(id).includes(q)) page.push(id);
             id++;
        }

    const nextCursor = page.length ? page[page.length - 1] ?? null : null
    return { page, nextCursor };
}