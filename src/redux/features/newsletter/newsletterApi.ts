import { baseApi } from "../../api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: (payload) => ({
        url: `/newsletter`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateNewsletterMutation } = newsletterApi;
