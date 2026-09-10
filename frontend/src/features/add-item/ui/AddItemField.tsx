import { useState, type ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";

interface AddItemFieldProps {
  onAdd: (id: number) => Promise<void>;
}

export function AddItemField({ onAdd }: AddItemFieldProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [queued, setQueued] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError("");
    if (queued) setQueued(false);
  };

  const handleAdd = () => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 1_000_000) {
      setError("ID должен быть больше 1 000 000");
      return;
    }
    void onAdd(id)
      .then(() => {
        setValue("");
        setQueued(true);
      })
      .catch(() => {
        setError("Не удалось добавить элемент");
      });
  };

  return (
    <div className="add-control-panel">
      <TextField
        className="add-control-panel__input"
        type="number"
        label="ID больше 1 000 000"
        variant="outlined"
        value={value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error || " "}
        slotProps={{ htmlInput: { min: 1 } }}
      />
      <Button
        className="add-control-panel__button"
        variant="contained"
        onClick={handleAdd}
      >
        Добавить
      </Button>
      {queued && <span>В очереди</span>}
    </div>
  );
}
