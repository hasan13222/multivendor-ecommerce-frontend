import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  filterModalOpen: false,
  loading: false,
  productId: "",
  formMode: "add",
  productPicture: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setmodalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setFilterModalOpen: (state, action) => {
      state.filterModalOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    }, 
    setFormMode: (state, action) => {
      state.formMode = action.payload;
    }, 
    setProductPicture: (state, action) => {
      state.productPicture = action.payload;
    }
  },
});

export const { setmodalOpen, setLoading, setProductId, setFormMode, setProductPicture, setFilterModalOpen } = productSlice.actions;
export default productSlice.reducer;
