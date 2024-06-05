import baseApi from "./baseApi";

const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (body) => ({
        url: "media/upload",
        method: "POST",
        body,
      }),
    }),
    getAllMedia: builder.query({
      query: () => "media",
    }),
    getMediaById: builder.query({
      query: (id) => `media/${id}`,
    }),
    deleteMediaById: builder.mutation({
      query: (id) => ({
        url: `media/${id}`,
        method: "DELETE",
      }),
    }),
    downloadMediaById: builder.query({
      query: (id) => `media/download/${id}`,
    }),
    serveMediaById: builder.query({
      query: (id) => `media/serve/${id}`,
    }),
  }),
});

export default mediaApi;
