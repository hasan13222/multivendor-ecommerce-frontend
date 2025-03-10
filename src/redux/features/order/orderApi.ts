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
      providesTags: ["MyOrder"]
    }),
    getMyShopOrder: builder.query({
      query: () => {
        return {
          url: "/order/my-shop-order",
          method: "GET",
        };
      },
      providesTags: ["MyShopOrder"]
    }),
    changeOrderStatus: builder.mutation({
      query: (payload) => ({
        url: `/order/${payload.id}`,
        method: "PATCH",
        body: payload.body
      }),
      invalidatesTags: ["MyOrder", "MyShopOrder"]
    })
  }),
});

export const { useOrderPaymentMutation,useChangeOrderStatusMutation, usePlaceOrderMutation, useGetMyOrderQuery, useGetMyShopOrderQuery} = orderApi;
