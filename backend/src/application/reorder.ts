import { ordered, selected } from "../infrastructure/item.js";
import type { ReorderInput, ReorderResult } from "./dto.js";

export function reorderSelected({ movedId, afterId }: ReorderInput): ReorderResult {
  if (!Number.isInteger(movedId) || !selected.has(movedId)) {
    return { error: "Not selected" };
  }

  const from = ordered.indexOf(movedId);
  if (from !== -1) ordered.splice(from, 1);

  if (afterId === null) {
    ordered.unshift(movedId);
  } else {
    const after = ordered.indexOf(afterId);
    if (after === -1) {
      ordered.push(movedId);
    } else {
      ordered.splice(after + 1, 0, movedId);
    }
  }

  return { id: movedId };
}
