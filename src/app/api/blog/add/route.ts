import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();

    const newBlog = await Blog.create(data);

    return NextResponse.json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add blog", details: error },
      { status: 500 }
    );
  }
}
