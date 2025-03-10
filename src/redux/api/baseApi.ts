import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://multivendor-ecommerce-server.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      // Get the token from your state (e.g., Redux store)
      const token = localStorage.getItem('token') || '';

      // Add the token to the Authorization header if it exists
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // You can set other headers too
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  
  tagTypes: ["products", "shopProduct", "MyOrder", "MyShopOrder","cartProducts", "categories", "followedShop", "checkFollowedShop", "usershop", "allUsers", "allShop"],
  endpoints: () => ({}),
});
