"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../lib/features/filter/filterSlice";
import { RootState } from "../lib/store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search products..."
      className="border p-2 w-full mb-4"
    />
  );
};

export default SearchBar;
