import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ItemRow } from "../../../entities/item/ui/ItemRow";
import { SortableItemRow } from "../../../features/reorder-selected/ui/SortableItemRow";

interface VirtualItemListProps {
  items: number[];
  checked: boolean;
  onToggle: (id: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  sortable?: boolean;
}

export function VirtualItemList({
  items,
  checked,
  onToggle,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  sortable = false,
}: VirtualItemListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 8,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems.at(-1);
    if (
      lastItem &&
      lastItem.index >= items.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, items.length, virtualItems]);

  return (
    <div ref={parentRef} className="panel__list">
      <div
        className="panel__virtual-content"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {virtualItems.map((virtualItem) => {
          const id = items[virtualItem.index];
          if (id === undefined) return null;
          return (
            <div
              key={id}
              className="panel__virtual-row"
              style={{ transform: `translateY(${virtualItem.start}px)` }}
            >
              {sortable ? (
                <SortableItemRow id={id} checked={checked} onToggle={() => onToggle(id)} />
              ) : (
                <ItemRow value={String(id)} checked={checked} onToggle={() => onToggle(id)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
