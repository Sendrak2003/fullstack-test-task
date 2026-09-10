import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import type { PageResult } from "../../../entities/item/model/types";
import { SELECTION_INVALIDATE_DELAY_MS } from "../../../shared/config";
import { updateOrder } from "../api/update-order";

export function useReorder(filter: string, selectedItems: number[]) {
  const queryClient = useQueryClient();

  return ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const movedId = Number(active.id);
    const targetId = Number(over.id);
    const fromIndex = selectedItems.indexOf(movedId);
    const targetIndex = selectedItems.indexOf(targetId);
    if (fromIndex === -1 || targetIndex === -1) return;

    const reordered = arrayMove(selectedItems, fromIndex, targetIndex);
    const afterIndex = reordered.indexOf(movedId) - 1;
    const afterId = afterIndex >= 0 ? reordered[afterIndex] ?? null : null;

    queryClient.setQueryData<InfiniteData<PageResult>>(["selected", filter], (data) => {
      if (!data) return data;
      let offset = 0;
      const pages = data.pages.map((page) => {
        const size = page.page.length;
        const slice = reordered.slice(offset, offset + size);
        offset += size;
        return { ...page, page: slice };
      });
      return { ...data, pages };
    });

    void updateOrder(movedId, afterId).catch(() => {
      window.setTimeout(() => {
        void queryClient.invalidateQueries({ queryKey: ["selected"] });
      }, SELECTION_INVALIDATE_DELAY_MS);
    });
  };
}
