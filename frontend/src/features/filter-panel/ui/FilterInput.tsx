import { TextField } from "@mui/material";
import type { ChangeEvent } from "react";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function FilterInput({ value, onChange }: FilterInputProps) {
  return (
    <TextField
      className="filters__input"
      type="number"
      label="Только цифры"
      variant="outlined"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      slotProps={{ htmlInput: { min: 1 } }}
    />
  );
}
