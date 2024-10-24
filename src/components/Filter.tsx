"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../lib/features/filter/filterSlice";
import { RootState } from "../lib/store";

interface FilterProps {
  categories: string[];
}

const Filter: React.FC<FilterProps> = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setCategory(event.target.value));
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="border p-2 w-full mb-4"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Filter;
