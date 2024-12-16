import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        searchTerm = "",
        limit = 10000,
        category = "",
        minPrice = 0,
        maxPrice = 100000000,
      }) => ({
        url: `/product?limit=${limit}&searchTerm=${searchTerm}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getShopProducts: builder.query({
      query: ({
        limit = 10000,
        shopId
      }) => ({
        url: `/product/shop/${shopId}?limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["shopProduct"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/product",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products", "shopProduct"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products", "shopProduct"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => {
        return ({
          url: `/product/${payload.productId}`,
          method: "PATCH",
          body: payload.data
        })
      },
      invalidatesTags: ["products", "shopProduct"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetShopProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApi;
