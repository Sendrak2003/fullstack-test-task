import { MAX_BASE_ID, extraId, selected } from "../infrastructure/item.js";

export const addItems = ( id: number ) => {
    if (
      !Number.isInteger(id) || id <= 0 || id <= MAX_BASE_ID ||
      selected.has(id) || extraId.includes(id)
    ) {
        return { error: 'Invalid id' };
    }
    extraId.push(id);
    extraId.sort((a, b) => a - b);
    return { id };
};