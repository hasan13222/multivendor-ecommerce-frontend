import { createSlice } from "@reduxjs/toolkit";
import { TCartItem } from "../../../pages/products/SingleProduct";

const cartItems = localStorage.getItem("cartItems");
const parsedItems = JSON.parse(cartItems as string);

const cartItemIds = parsedItems?.map((item: TCartItem) => item.productId);
const initialState = {
  cartItems: JSON.parse(cartItems as string),
  cartItemIds,
  singleProductId: "",
};

const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.cartItemIds = action.payload.map((item: TCartItem) => item.productId);
    },
    setSingleProductId: (state, action) => {
      state.singleProductId = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartItemIds = [];
      state.singleProductId = "";
    }
  },
});

export const { setCart, setSingleProductId, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
