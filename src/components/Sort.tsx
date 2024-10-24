"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "../lib/features/filter/filterSlice";
import { RootState } from "../lib/store";

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.filter.sortOrder);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(event.target.value as "asc" | "desc"));
  };

  return (
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="border p-2 w-full mb-4"
    >
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

export default Sort;
