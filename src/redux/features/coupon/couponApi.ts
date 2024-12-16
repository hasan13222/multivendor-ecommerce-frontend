import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: (code) => ({
        url: `/coupon/?code=${code}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetCouponQuery } = couponApi;
