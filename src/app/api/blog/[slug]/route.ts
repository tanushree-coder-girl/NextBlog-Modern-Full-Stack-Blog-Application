import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  await connectDB();
  try {
    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching blog", details: (error as Error).message },
      { status: 500 }
    );
  }
}
