import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (payload) => ({
        url: `/contact`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
