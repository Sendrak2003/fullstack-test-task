import { useEffect, useRef } from "react";
import { type InfiniteData, useQueryClient } from "@tanstack/react-query";
import type { PageResult } from "../../../entities/item/model/types";
import {
  SELECTION_FLUSH_MS,
  SELECTION_INVALIDATE_DELAY_MS,
} from "../../../shared/config";
import { type SelectionAction, updateSelection } from "../api/update-selection";

export function useSelectionQueue(filter: string) {
  const queryClient = useQueryClient();
  const pending = useRef(new Map<number, SelectionAction>());

  const updateCache = (id: number, action: SelectionAction) => {
    queryClient.setQueryData<InfiniteData<PageResult>>(["items", filter], (data) => {
      if (!data) return data;
      const pages = data.pages.map((page) => ({
        ...page,
        page:
          action === "select" ? page.page.filter((itemId) => itemId !== id) : page.page,
      }));
      if (action === "deselect" && String(id).includes(filter) && pages[0]) {
        const first = pages[0];
        const at = first.page.findIndex((itemId) => itemId > id);
        pages[0] = {
          ...first,
          page:
            at === -1
              ? [...first.page, id]
              : [...first.page.slice(0, at), id, ...first.page.slice(at)],
        };
      }
      return { ...data, pages };
    });
    queryClient.setQueryData<InfiniteData<PageResult>>(["selected", filter], (data) => {
      if (!data) return data;
      const pages = data.pages.map((page) => ({
        ...page,
        page:
          action === "deselect" ? page.page.filter((itemId) => itemId !== id) : page.page,
      }));
      if (action === "select" && String(id).includes(filter) && pages.length > 0) {
        const lastIndex = pages.length - 1;
        const last = pages[lastIndex];
        if (last && last.nextCursor === null) {
          pages[lastIndex] = { ...last, page: [...last.page, id] };
        }
      }
      return { ...data, pages };
    });
  };

  useEffect(() => {
    const invalidate = () => {
      void queryClient.invalidateQueries({ queryKey: ["items"] });
      void queryClient.invalidateQueries({ queryKey: ["selected"] });
    };
    const timer = window.setInterval(() => {
      if (pending.current.size === 0) return;
      const requests = [...pending.current].map(([id, action]) =>
        updateSelection(id, action),
      );
      pending.current.clear();
      void Promise.all(requests).catch(invalidate);
      window.setTimeout(invalidate, SELECTION_INVALIDATE_DELAY_MS);
    }, SELECTION_FLUSH_MS);
    return () => window.clearInterval(timer);
  }, [queryClient]);

  return (id: number, action: SelectionAction) => {
    updateCache(id, action);
    pending.current.set(id, action);
  };
}
