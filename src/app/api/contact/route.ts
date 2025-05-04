import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Contact } from "@/models/Contact";

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();
    const newMessage = await Contact.create(data);

    return NextResponse.json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message", details: error },
      { status: 500 }
    );
  }
}
