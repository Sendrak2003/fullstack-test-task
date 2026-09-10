import { post } from "../../../shared/api/http";

export function addItem(id: number): Promise<void> {
  return post("/api/add", { id });
}
