import { MAX_BASE_ID, extraId, selected, ordered } from "../infrastructure/item.js";

function canSelect(id: number): boolean {
  return (
    Number.isInteger(id) &&
    id > 0 &&
    (id <= MAX_BASE_ID || extraId.includes(id)) &&
    !selected.has(id)
  );
}

export function addToSelected(id: number): { id: number } | { error: string } {
  if (!canSelect(id)) {
    return { error: "Invalid id" };
  }
  selected.add(id);
  ordered.push(id);
  return { id };
}
