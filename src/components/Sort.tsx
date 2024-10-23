"use client";
import React from "react";

interface SortProps {
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

const Sort: React.FC<SortProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="mb-4">
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="border p-2 rounded-md w-full"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
