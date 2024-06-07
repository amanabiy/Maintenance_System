import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (body) => {
              const isFormData = body instanceof FormData;
              return {
                url: 'users',
                method: 'POST',
                body: isFormData ? body : JSON.stringify(body),
                headers: isFormData ? {} : { 'Content-Type': 'application/json' },
              };
            },
          }),
        updateUserById: builder.mutation({
            query: ({ id, user }) => {
                const body = user instanceof FormData ? user : JSON.stringify(user);
                return {
                    url: `users/${id}`,
                    method: 'PATCH',
                    body,
                    headers: user instanceof FormData ? {} : {
                        'Content-Type': 'application/json'
                    },
                };
            },
        }),
        getMe: builder.query({
            query: () => 'users/me',
        }),
        deleteUserById: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllUsers: builder.query({
          query: (page = 1, limit = 1000) => `users/?page=${page}&limit=${limit}`, //temp adjusted limit
        }),
        getUsersFuzzy: builder.query({
          query: (term) => `users/fuzzy-search/${term}`,
        }),
        getUserById: builder.query({
          query: (id) => `users/${id}`,
        }),
    }),
});

export default userApi;
