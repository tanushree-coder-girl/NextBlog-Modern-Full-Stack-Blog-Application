"use client";

import CardItem from "./CardItem";
import { Typography, CircularProgress } from "@mui/material";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { Blog } from "@/types/types";

export default function TrendingArticles() {
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h5"
          className="!font-semibold text-gray-800 text-lg sm:text-xl"
          sx={{ marginBottom: "12px" }}
        >
          Our Trending Articles
        </Typography>

        <Typography
          className="text-gray-600 max-w-2xl text-sm sm:text-base"
          sx={{ marginBottom: "40px" }}
        >
          Discover the latest in sustainable farming, green tech, and
          eco-conscious living. Dive into expert insights shaping the future of
          agriculture.
        </Typography>

        {isLoading && (
          <div className="flex justify-center py-10">
            <CircularProgress size={32} thickness={4} />
          </div>
        )}
        {isError && (
          <Typography className="text-red-500">
            Failed to load blogs.
          </Typography>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!isLoading &&
            !isError &&
            blogs
              ?.slice(0, 3)
              .map((article: Blog) => (
                <CardItem
                  key={article._id}
                  image={article.image}
                  title={article.title}
                  description={article.excerpt}
                  buttonText="Learn more"
                  link={`/blog/${article.slug}`}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
