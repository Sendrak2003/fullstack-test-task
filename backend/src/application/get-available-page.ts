import { extraId, MAX_BASE_ID, selected } from "../infrastructure/item.js";
import type { PageQuery, PageResult } from "./dto.js";

export const getAvailablePage = ({ cursor, limit, q }: PageQuery): PageResult => {
    let id = cursor + 1;
    const page: number[] = [];
        while (page.length < limit && id <= MAX_BASE_ID) {
            if (!selected.has(id) && String(id).includes(q)) page.push(id);
             id++;
        }
        for (const extra of extraId) {
            if (page.length >= limit) break;
            if (extra > cursor && String(extra).includes(q) && !selected.has(extra)) page.push(extra);
        }

    const nextCursor = page.length ? page[page.length - 1] ?? null : null
    return { page, nextCursor };
}