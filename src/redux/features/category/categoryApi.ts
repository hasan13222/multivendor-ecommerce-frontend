import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: (arg) => ({
        url: `/category/${arg.id}`,
        method: "PATCH",
        body: arg.payload
      }),
      invalidatesTags: ["categories"]
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: `/category`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"]
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;
