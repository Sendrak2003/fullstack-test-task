import { addItems } from "../application/add-items.js";

const pending = new Set<number>();

export function enqueueAdd(ids: number[]) {
  for (const id of ids) pending.add(id);
}

export function flushAdds() {
  if (pending.size === 0) return;
  const batch = [...pending];
  pending.clear();

  for (const id of batch) {
    addItems(id);
  }
}

setInterval(flushAdds, 10_000);
