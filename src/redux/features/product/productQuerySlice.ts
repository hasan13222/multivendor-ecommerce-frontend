import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  limit: 8,
  page: 1,
  sort: "",
  category: "",
  brand: "",
  minPrice: 0,
  maxPrice: 1000000,
  minRating: 0,
};
const productQuerySlice = createSlice({
  name: "productQuery",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilterValues: (state, action) => {
      return {...state, ...action.payload}
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    clearFilter: () => {
      return initialState;
    }
  },
});

export const { setSearchTerm, setBrand, setCategory,setFilterValues, setLimit, setMaxPrice, setMinPrice, setMinRating, setPage, setSort, clearFilter } = productQuerySlice.actions;
export default productQuerySlice.reducer;
