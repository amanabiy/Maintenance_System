import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://23.94.117.101:8081/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const cookieParts = document.cookie.split(";");
      let authToken = null;
      for (let part of cookieParts) {
        if (part.includes("authToken")) {
          authToken = part.split("=")[1];
          break;
        }
      }
      // console.log("token", authToken);
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export default baseApi;
