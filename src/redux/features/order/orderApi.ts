import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderPayment: builder.mutation({
      query: (payload) => ({
        url: "/order/payment",
        method: "POST",
        body: payload,
      }),
    }),
    placeOrder: builder.mutation({
      query: (payload) => {
        return {
          url: "/order",
          method: "POST",
          body: payload,
        };
      },
    }),
    getMyOrder: builder.query({
      query: () => {
        return {
          url: "/order/my-order",
          method: "GET",
        };
      },
    }),
    getMyShopOrder: builder.query({
      query: () => {
        return {
          url: "/order/my-shop-order",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useOrderPaymentMutation, usePlaceOrderMutation, useGetMyOrderQuery, useGetMyShopOrderQuery} = orderApi;
