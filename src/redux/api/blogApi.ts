import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getBlogs: builder.query<any[], void>({
      query: () => "/blog",
    }),

    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/add",
        method: "POST",
        body: data,
      }),
    }),

    getBlogBySlug: builder.query<any, string>({
      query: (slug) => `/blog/${slug}`,
    }),

    getCommentsBySlug: builder.query({
      query: (slug: string) => `/comment?slug=${slug}`,
    }),

    addComment: builder.mutation({
      query: (commentData) => ({
        url: "/comment",
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useAddCommentMutation,
  useGetCommentsBySlugQuery,
} = blogApi;
