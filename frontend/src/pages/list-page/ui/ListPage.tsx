import "./ListPage.scss";
import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Header } from "../../../widgets/header/ui/Header";
import { VirtualItemList } from "../../../widgets/virtual-item-list/ui/VirtualItemList";
import { FilterInput } from "../../../features/filter-panel/ui/FilterInput";
import { AddItemField } from "../../../features/add-item/ui/AddItemField";
import { useAddItem } from "../../../features/add-item/model/use-add-item";
import { useSelectionQueue } from "../../../features/select-item/model/use-selection-queue";
import { useReorder } from "../../../features/reorder-selected/model/use-reorder";
import { fetchPage } from "../../../entities/item/api/fetch-page";
import { useDebouncedValue } from "../../../shared/lib/use-debounced-value";
import { FILTER_DEBOUNCE_MS } from "../../../shared/config";

export function ListPage() {
  const [filterInput, setFilterInput] = useState("");
  const filter = useDebouncedValue(filterInput, FILTER_DEBOUNCE_MS);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const availableQuery = useInfiniteQuery({
    queryKey: ["items", filter],
    queryFn: ({ pageParam }) => fetchPage("/api/items", filter, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: (previousData) => previousData,
  });
  const selectedQuery = useInfiniteQuery({
    queryKey: ["selected", filter],
    queryFn: ({ pageParam }) => fetchPage("/api/selected", filter, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: (previousData) => previousData,
  });

  const availableItems = availableQuery.data?.pages.flatMap((page) => page.page) ?? [];
  const selectedItems = selectedQuery.data?.pages.flatMap((page) => page.page) ?? [];

  const enqueueSelection = useSelectionQueue(filter);
  const enqueueItem = useAddItem();
  const handleDragEnd = useReorder(filter, selectedItems);

  const errorMessage = availableQuery.error?.message ?? selectedQuery.error?.message;

  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <div className="filters">
          <FilterInput value={filterInput} onChange={setFilterInput} />
        </div>
        <AddItemField onAdd={enqueueItem} />
        {errorMessage && <div role="alert">An error has occurred: {errorMessage}</div>}
        {availableQuery.isPending && selectedQuery.isPending && <div>Loading...</div>}
        <div className="panels">
          <div className="panel">
            <VirtualItemList
              items={availableItems}
              checked={false}
              onToggle={(id) => enqueueSelection(id, "select")}
              hasNextPage={availableQuery.hasNextPage}
              isFetchingNextPage={availableQuery.isFetchingNextPage}
              fetchNextPage={() => void availableQuery.fetchNextPage()}
            />
          </div>
          <div className="panel">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedItems.map(String)}
                strategy={verticalListSortingStrategy}
              >
                <VirtualItemList
                  items={selectedItems}
                  checked
                  onToggle={(id) => enqueueSelection(id, "deselect")}
                  hasNextPage={selectedQuery.hasNextPage}
                  isFetchingNextPage={selectedQuery.isFetchingNextPage}
                  fetchNextPage={() => void selectedQuery.fetchNextPage()}
                  sortable
                />
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}
