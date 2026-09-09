import { useState, type ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";

export function AddItemField() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  const handleAdd = () => {
    if (value.trim() === "") {
      setError("Введите значение");
      return;
    }
    setValue("");
  };

  return (
    <div className="add-control-panel">
      <TextField
        className="add-control-panel__input"
        type="number"
        label="Только цифры"
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
    </div>
  );
}
