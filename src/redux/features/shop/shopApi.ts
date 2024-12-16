import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleShop: builder.query({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["followedShop"]
    }),
    getMyShop: builder.query({
      query: () => ({
        url: `/shop/shop/mine`,
        method: "GET",
      }),
      providesTags: ["usershop"]
    }),
    getAllShop: builder.query({
      query: () => ({
        url: `/shop`,
        method: "GET",
      }),
      providesTags: ["allShop"]
    }),
    checkShopFollow: builder.query({
      query: (shopId) => ({
        url: `/shop/check-follow/${shopId}`,
        method: "GET",
      }),
      providesTags: ["checkFollowedShop"]
    }),
    followShop: builder.mutation({
      query: (shopId) => {
        return {
          url: `/shop/follow/${shopId}`,
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["followedShop", "checkFollowedShop"]
    }),
    unfollowShop: builder.mutation({
      query: (shopId) => {
        return {
          url: `/shop/unfollow/${shopId}`,
          method: "DELETE",
          body: {},
        };
      },
      invalidatesTags: ["followedShop", "checkFollowedShop"]
    }),
    createShop: builder.mutation({
      query: (payload) => {
        return {
          url: `/shop`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["usershop"]
    }),
    updateShop: builder.mutation({
      query: (arg) => {
        return {
          url: `/shop/${arg.shopId}`,
          method: "PATCH",
          body: arg.payload,
        };
      },
      invalidatesTags: ["usershop"]
    }),
    changeShopStatus: builder.mutation({
      query: (arg) => {
        return {
          url: `/shop/change-shop-status/${arg.shopId}`,
          method: "PATCH",
          body: {status: arg.status},
        };
      },
      invalidatesTags: ["allShop", "usershop"]
    }),
  }),
});

export const { useGetSingleShopQuery,useChangeShopStatusMutation, useGetAllShopQuery,useUpdateShopMutation, useCreateShopMutation, useGetMyShopQuery, useFollowShopMutation, useCheckShopFollowQuery, useUnfollowShopMutation } = shopApi;
