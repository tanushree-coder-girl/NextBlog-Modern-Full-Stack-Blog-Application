import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export async function GET() {
  await connectDB();

  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error },
      { status: 500 }
    );
  }
}
