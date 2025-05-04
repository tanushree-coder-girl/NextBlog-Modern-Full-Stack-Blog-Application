import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully" });
}
