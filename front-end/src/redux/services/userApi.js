import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
        getAllUsers: builder.query({
            query: () => 'users',
        }),
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),
        updateUserById: builder.mutation({
            query: ({ id, body }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteUserById: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export default userApi;