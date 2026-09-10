import { useQueryClient } from "@tanstack/react-query";
import { ADD_INVALIDATE_DELAY_MS } from "../../../shared/config";
import { addItem } from "../api/add-item";

export function useAddItem() {
  const queryClient = useQueryClient();

  return async (id: number) => {
    await addItem(id);
    window.setTimeout(() => {
      void queryClient.invalidateQueries({ queryKey: ["items"] });
    }, ADD_INVALIDATE_DELAY_MS);
  };
}
