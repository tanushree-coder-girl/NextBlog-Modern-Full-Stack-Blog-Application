import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    blogSlug: { type: String, required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
