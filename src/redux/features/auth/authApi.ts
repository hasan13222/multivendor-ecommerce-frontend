import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: payload,
        };
      },
    }),
    register: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/auth`,
          method: "GET",
        };
      },
      providesTags: ["allUsers"]
    }),
    changeStatus: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/change-account-status/${payload.id}`,
          method: "POST",
          body: payload.data,
        };
      },
      invalidatesTags: ["allUsers"]
    }),
    deleteAccount: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/delete-account/${id}`,
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["allUsers"]
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: payload,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/forget-password`,
          method: "POST",
          body: payload,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useChangeStatusMutation,
  useDeleteAccountMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
} = authApi;
