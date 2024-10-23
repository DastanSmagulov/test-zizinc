"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedCategory: string;
  sortOrder: "asc" | "desc";
  searchTerm: string;
}

const initialState: FilterState = {
  selectedCategory: "",
  sortOrder: "asc",
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSortOrder, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
