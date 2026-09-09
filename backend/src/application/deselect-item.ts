import { selected, ordered } from "../infrastructure/item.js";

export function removeFromSelected(id: number): { id: number } | { error: string } {
  if (!selected.has(id)) {
    return { error: "Invalid id" };
  }
  const idx = ordered.indexOf(id);

  if (idx !== -1) {
    ordered.splice(idx, 1);
  }
  selected.delete(id);
  return { id };
}
