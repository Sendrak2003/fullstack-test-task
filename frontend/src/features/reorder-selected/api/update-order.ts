import { post } from "../../../shared/api/http";

export function updateOrder(movedId: number, afterId: number | null): Promise<void> {
  return post("/api/order", { movedId, afterId });
}
