import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: (code) => ({
        url: `/coupon/?code=${code}`,
        method: "GET",
      }),
    }),
    getAllCoupon: builder.query({
      query: () => ({
        url: `/coupon/all`,
        method: "GET",
      }),
    }),
    createCoupon: builder.mutation({
      query: (payload) => ({
        url: `/coupon`,
        method: "POST",
        body: payload,
      }),
    }),
    updateCoupon: builder.mutation({
      query: (arg) => ({
        url: `/coupon/${arg.id}`,
        method: "PATCH",
        body: arg.payload,
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetCouponQuery,
  useGetAllCouponQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
