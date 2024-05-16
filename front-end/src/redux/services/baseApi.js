import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://23.94.117.101:8081/api/v1/',
    prepareHeaders: (headers, { getState }) => {
        const token = decodeURIComponent(document.cookie).split(";").find((c) => c.trim().startsWith("token="))?.split("=")[1];
        console.log("token", token);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
}),
  endpoints: (builder) => ({}),
})

export default baseApi;