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
          
        getAllUsers: builder.query({
            query: () => 'users',
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
            }),
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
        
        deleteUserById: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export default userApi;