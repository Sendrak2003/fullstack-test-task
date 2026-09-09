import { addToSelected } from "../application/select-item.js";
import { removeFromSelected } from "../application/deselect-item.js";

const pendingSelect = new Set<number>();
const pendingDeselect = new Set<number>();

export function enqueueSelection(id: number, action: "select" | "deselect") {
  if (!Number.isInteger(id)) return;
  if (action === "select") {
    pendingDeselect.delete(id);
    pendingSelect.add(id);
  } else {
    pendingSelect.delete(id);
    pendingDeselect.add(id);
  }
}

export function flushSelection() {
  for (const id of pendingSelect) addToSelected(id);
  for (const id of pendingDeselect) removeFromSelected(id);
  pendingSelect.clear();
  pendingDeselect.clear();
}

setInterval(flushSelection, 1000);
