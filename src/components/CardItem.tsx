"use client";

import { Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface CardItemProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  link?: string;
}

export default function CardItem({
  image,
  title,
  description,
  buttonText,
  link,
}: CardItemProps) {
  const content = (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-52 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <Typography variant="h6" className="text-green-700 font-semibold mb-2">
          {title}
        </Typography>
        <Typography className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </Typography>
        <Button size="small" className="!text-green-600 !capitalize px-0 text-sm">
          {buttonText} →
        </Button>
      </div>
    </div>
  );

  return link ? <Link href={link}>{content}</Link> : content;
}
