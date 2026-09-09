import { useState, type ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import { textIdPattern } from "../../../shared/lib/validation";

export function AddItemField() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!textIdPattern.test(next)) return;
    setValue(next);
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
        type="text"
        label="Только буквы и цифры"
        variant="outlined"
        value={value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error || " "}
        slotProps={{ htmlInput: { minLength: 1, maxLength: 100 } }}
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
