import mongoose, { Schema, models } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true }, // base64 string
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString() },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = models.Blog || mongoose.model("Blog", blogSchema);
