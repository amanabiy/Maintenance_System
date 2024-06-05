import mediaApi from "../services/mediaApi";

export const {
  useUploadMediaMutation,
  useGetAllMediaQuery,
  useGetMediaByIdQuery,
  useDeleteMediaByIdMutation,
  useDownloadMediaByIdQuery,
  useServeMediaByIdQuery,
} = mediaApi;
