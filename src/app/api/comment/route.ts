import { connectDB } from "@/lib/mongoose";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = await new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    await connectDB();
    const comments = await Comment.find({ blogSlug: slug }).sort({
      createdAt: -1,
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newComment = await Comment.create(body);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to post comment" },
      { status: 500 }
    );
  }
}
