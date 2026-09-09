import { Checkbox, Typography } from "@mui/material";
import "./ItemRow.scss";

interface ItemRowProps {
  value: string;
  checked: boolean;
  onToggle: () => void;
}

export function ItemRow({ value, checked, onToggle }: ItemRowProps) {
  return (
    <div className="item-row">
      <Checkbox checked={checked} onChange={onToggle} />
      <Typography >{value}</Typography>
    </div>
  );
}
