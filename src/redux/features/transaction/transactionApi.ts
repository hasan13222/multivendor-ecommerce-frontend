import { baseApi } from "../../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: () => {
        return {
          url: "/transaction",
          method: "GET",
        };
      },
    }),
    getMyTransaction: builder.query({
      query: () => {
        return {
          url: "/transaction/my-transaction",
          method: "GET",
        };
      },
    }),
    getMyShopTransaction: builder.query({
      query: () => {
        return {
          url: "/transaction/my-shop-transaction",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMyTransactionQuery,
  useGetMyShopTransactionQuery,
  useGetAllTransactionQuery,
} = transactionApi;
