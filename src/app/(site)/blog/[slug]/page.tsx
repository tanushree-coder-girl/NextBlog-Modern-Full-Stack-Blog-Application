"use client";

import { useParams } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  Divider,
  Card,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useGetCommentsBySlugQuery,
  useAddCommentMutation,
  useGetBlogBySlugQuery,
  useGetBlogsQuery,
} from "@/redux/api/blogApi";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "notistack";
import {Comment} from '@/types/types';

export default function BlogDetail() {
  const { slug } = useParams();
  const [newComment, setNewComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { data: allBlogs = [] } = useGetBlogsQuery();
  const relatedBlogs = allBlogs.filter((b) => b.slug !== slug);
  const { data: comments = [], refetch } = useGetCommentsBySlugQuery(
    slug as string
  );
  const [addComment] = useAddCommentMutation();
  const {
    data: blog,
    isLoading,
    isError,
  } = useGetBlogBySlugQuery(slug as string);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment({
        blogSlug: slug,
        name: user?.name || "Anonymous",
        comment: newComment,
      }).unwrap();

      setNewComment("");
      enqueueSnackbar("Comment posted successfully!", { variant: "success" });
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to post comment", { variant: "error" });
      console.error("Post comment error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <div className="flex justify-center py-10">
          <CircularProgress size={32} thickness={4} />
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center py-24">
        <Typography variant="h6" color="error">
          Blog not found!
        </Typography>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Blog Content */}
        <div className="lg:col-span-2">
          <div className="relative h-60 sm:h-80 w-full rounded-xl overflow-hidden shadow-md mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#1f2937",
              mb: 1,
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            {blog.title}
          </Typography>

          <Typography sx={{ color: "#6b7280", fontSize: "0.875rem", mb: 4 }}>
            By {blog.author} · {blog.date}
          </Typography>

          <div
            className="text-base text-gray-700 leading-relaxed mb-10 blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <Divider sx={{ mb: 6 }} />

          {/* Comments */}
          <section>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1f2937", mb: 2 }}
            >
              Comments ({comments.length})
            </Typography>

            <div className="space-y-4 mb-8">
              {comments.map((c: Comment) => (
                <div
                  key={c._id}
                  className="border p-4 rounded-md bg-gray-50 shadow-sm"
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#15803d",
                      mb: 0.5,
                    }}
                  >
                    {c.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", color: "#374151" }}>
                    {c.comment}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <TextField
                  fullWidth
                  label="Write a comment..."
                  multiline
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-green-600"
                  sx={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  Post Comment
                </Button>
              </form>
            ) : (
              <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-md mb-8">
                <Typography
                  sx={{ fontSize: "0.875rem", color: "#374151", mb: 1 }}
                >
                  You must be logged in to post a comment.
                </Typography>
                <Button
                  variant="contained"
                  className="!bg-green-600"
                  href="/login"
                  component="a"
                >
                  Login to Comment
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>{blog.author[0]}</Avatar>
              <div>
                <Typography sx={{ fontWeight: 600, color: "#1f2937" }}>
                  {blog.author}
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {blog.date}
                </Typography>
              </div>
            </div>

            <Typography sx={{ fontSize: "0.875rem", color: "#4b5563", mb: 2 }}>
              {`Hi, I'm ${blog.author}. I write about sustainability, farming, and nature. Read more from me below!`}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Button
              href="/blog"
              component="a"
              variant="outlined"
              fullWidth
              className="!text-green-600 !border-green-600"
              sx={{ marginBottom: "10px" }}
            >
              Read More Articles
            </Button>

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, marginBottom: "10px" }}
            >
              More Like This
            </Typography>

            {relatedBlogs.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="flex items-start gap-4 mb-4 cursor-pointer"
                onClick={() => (window.location.href = `/blog/${item.slug}`)}
              >
                <div className="w-20 h-16 relative rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      color: "#1f2937",
                    }}
                  >
                    {item.title.length > 50
                      ? item.title.slice(0, 50) + "..."
                      : item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {item.author} · {item.date}
                  </Typography>
                </div>
              </div>
            ))}
          </Card>
        </aside>
      </div>
    </main>
  );
}
