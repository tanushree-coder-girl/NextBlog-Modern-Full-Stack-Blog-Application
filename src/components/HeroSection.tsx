"use client";

import React from "react";
import { Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  imageAlt?: string;
  link?: any;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  imageAlt = "Hero Image",
  link,
}) => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6">
          <Typography
            variant="h3"
            className="text-3xl sm:text-4xl lg:text-5xl !font-semibold text-gray-800 leading-tight tracking-tight"
          >
            {title}
          </Typography>
          <Typography className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
            {description}
          </Typography>
          <div>
            <Link href={link}>
              <Button
                variant="outlined"
                className="!text-green-700 !border-green-700 hover:!bg-green-50 rounded-full px-6 sm:px-8 py-2 text-sm sm:text-base capitalize"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-72 sm:h-96 md:h-[450px] w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
