import { reorderSelected } from "../application/reorder.js";

const pendingReorder = new Map<number, number | null>();

export function enqueueReorder(movedId: number, afterId: number | null) {
  if (!Number.isInteger(movedId)) return;
  if (afterId !== null && !Number.isInteger(afterId)) return;
  pendingReorder.set(movedId, afterId);
}

function flushReorder() {
  for (const [movedId, afterId] of pendingReorder) {
    reorderSelected({ movedId, afterId });
  }
  pendingReorder.clear();
}

setInterval(flushReorder, 1000);