import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:3000/api";

const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [] as string[], // Define tag types if used for caching/invalidation
  endpoints: (builder) => ({}),
});
