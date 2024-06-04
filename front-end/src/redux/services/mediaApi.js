import baseApi from "./baseApi";

const mediaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadMedia: builder.mutation({
            query: (body) => ({
                url: 'media/upload',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export default mediaApi;