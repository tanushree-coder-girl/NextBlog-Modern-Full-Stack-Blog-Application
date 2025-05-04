"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import img1 from "../assets/images/slide1.avif";
import img2 from "../assets/images/slide2.avif";
import img3 from "../assets/images/slide3.avif";
import img4 from "../assets/images/slide4.avif";

const images = [img1, img2, img3, img4];

export default function MainHero() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <section className="bg-white px-4 pt-8 pb-14 lg:py-12">
      <div className="max-w-7xl mx-auto grid gap-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <Typography
            variant="h4"
            className="!font-bold !text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Cultivating Knowledge for a <br /> Greener Tomorrow
          </Typography>
          <div className="max-w-2xl text-sm sm:text-base">
            <Typography className="text-gray-500 mb-3 leading-relaxed">
              Discover the latest in sustainable agriculture, smart farming
              techniques, and eco-friendly practices that shape the future of
              our planet.
            </Typography>
            <Link
              href="/about"
              className="text-green-600 font-medium hover:underline transition"
            >
              Learn More →
            </Link>
          </div>
        </div>

        <div className="w-full h-64 md:h-[400px] rounded-lg overflow-hidden shadow-md">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index} className="relative w-full h-64 md:h-[400px]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
