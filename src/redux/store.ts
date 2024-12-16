import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import productReducer from "./features/product/productSlice"
import cartReducer from "./features/cart/cartSlice"
import productQueryReducer from "./features/product/productQuerySlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    product: productReducer,
    productQuery: productQueryReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
