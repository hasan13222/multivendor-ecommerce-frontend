import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReview: builder.query({
      query: (productId) => ({
        url: `/review/${productId}`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: (payload) => ({
        url: `/review`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetProductReviewQuery, useAddReviewMutation } = reviewApi;
