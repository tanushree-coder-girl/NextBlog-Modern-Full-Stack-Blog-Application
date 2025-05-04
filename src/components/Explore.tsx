"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Explore() {
  return (
    <section className="bg-white px-4 py-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <Typography
            variant="h5"
            className="!font-semibold text-gray-800 text-lg sm:text-xl"
            sx={{ marginBottom: "10px" }}
          >
            Explore Our Agricultural Vision
          </Typography>
          <Typography
            className="text-gray-600 text-sm sm:text-base"
            sx={{ marginBottom: "10px" }}
          >
            Discover how we’re helping communities grow sustainably by blending
            modern technology with traditional farming wisdom.
          </Typography>
          <Link
            href="/service"
            className="text-green-600 font-medium hover:underline transition"
          >
            Discover More →
          </Link>
        </div>

        <div className="relative w-full h-60 sm:h-72 md:h-[400px] rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1973&auto=format&fit=crop"
            alt="Explore Agriculture"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
