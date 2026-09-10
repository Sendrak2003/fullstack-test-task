import { post } from "../../../shared/api/http";

export type SelectionAction = "select" | "deselect";

export function updateSelection(id: number, action: SelectionAction): Promise<void> {
  return post("/api/selection", { id, action });
}
