import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ItemRow } from "../../../entities/item/ui/ItemRow";

interface SortableItemRowProps {
  id: number;
  checked: boolean;
  onToggle: () => void;
}

export function SortableItemRow({ id, checked, onToggle }: SortableItemRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: String(id),
  });

  return (
    <div
      ref={setNodeRef}
      className="panel__sortable-row"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <ItemRow value={String(id)} checked={checked} onToggle={onToggle} />
    </div>
  );
}
