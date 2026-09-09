import { useState } from "react";
import "./ListPage.scss";
import { Header } from "../../../widgets/header/ui/Header";
import { FilterInput } from "../../../features/filter-panel/ui/FilterInput";
import { AddItemField } from "../../../features/add-item/ui/AddItemField";
import { ItemRow } from "../../../entities/item/ui/ItemRow";

export function ListPage() {
  const [filter, setFilter] = useState("");

  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <div className="filters">
          <FilterInput value={filter} onChange={setFilter} />
        </div>
        <AddItemField />
        <div className="panels">
          <div className="panel">
            <div className="panel__list">
              <ItemRow value="Element 1" checked={false} onToggle={() => {}} />
            </div>
          </div>
          <div className="panel">
            <div className="panel__list">
              <ItemRow value="Element 2" checked={true} onToggle={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
