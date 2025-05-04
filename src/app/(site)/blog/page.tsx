"use client";

import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import CardItem from "@/components/CardItem";
import HeroSection from "@/components/HeroSection";
import { useAuth } from "@/hooks/useAuth";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { Blog } from "@/types/types";

const BlogPage = () => {
  const { isAuthenticated } = useAuth();
  const { data: blogs, isLoading, isError } = useGetBlogsQuery();

  return (
    <main className="bg-white">
      <HeroSection
        title="Share Your Knowledge with the Community"
        description="Write your own blog post and contribute to smarter, sustainable farming practices."
        buttonText="Write a Blog"
        imageUrl="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Add Blog Hero"
        link={isAuthenticated ? "/blog/addBlog" : "/login"}
      />

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Typography
                variant="h3"
                className="!font-semibold text-gray-800 leading-tight"
              >
                Blog Library
              </Typography>
            </div>

            <div className="mb-8 flex justify-center text-center">
              <Typography className="text-gray-600  text-base leading-relaxed">
                Insights, updates, and hands-on guidance to keep your
                agri-knowledge fresh.
              </Typography>
            </div>
          </div>

          {/* Loading / Error / Success States */}
          {isLoading ? (
            <div className="flex justify-center py-10">
              <CircularProgress size={32} thickness={4} />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load blogs.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">
              {blogs?.map((blog: Blog) => (
                <CardItem
                  key={blog._id}
                  image={blog.image}
                  title={blog.title}
                  description={blog.excerpt}
                  buttonText="Read More"
                  link={`/blog/${blog.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
