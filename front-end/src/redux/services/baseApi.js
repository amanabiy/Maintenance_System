import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_LOCAL_API_URL = "http://23.94.117.101:8081/api/v1/";
const REACT_APP_PROD_API_URL = "https://www.maintains.live/api/v1";
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      window.location.hostname === "localhost"
        ? REACT_APP_LOCAL_API_URL
        : REACT_APP_PROD_API_URL,
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
  tagTypes: ["Role"],
  endpoints: (builder) => ({}),
});

export default baseApi;
