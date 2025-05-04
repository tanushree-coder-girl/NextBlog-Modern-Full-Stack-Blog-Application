import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { comparePasswords, signJwtToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signJwtToken({ id: user._id, email: user.email });

  // ✅ Set HTTP-only cookie
  (await
    // ✅ Set HTTP-only cookie
    cookies()).set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
  });

  // ✅ Also send token and user in response (for Redux or localStorage)
  return NextResponse.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
