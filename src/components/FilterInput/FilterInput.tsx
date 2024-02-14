import React from "react";

interface FilterInputProps {
  onFilterChange: (value: string) => void;
  filterValue: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  onFilterChange,
  filterValue,
}) => (
  <div>
    <label htmlFor="filterInput">Filter:</label>
    <input
      type="text"
      id="filterInput"
      value={filterValue}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  </div>
);

export default FilterInput;
