"use client";

import React from "react";
import { Typography } from "@mui/material";
import {
  ElectricScooter,
  Group,
  PrecisionManufacturing,
} from "@mui/icons-material";

const coreValues = [
  {
    title: "Sustainability at Heart",
    desc: "We champion practices that nurture the Earth — from regenerative farming to conscious living.",
    icon: <ElectricScooter fontSize="large" className="text-green-600" />,
  },
  {
    title: "Community-Driven",
    desc: "We believe growth happens together. Our platform uplifts real voices, ideas, and stories from the field.",
    icon: <Group fontSize="large" className="text-green-600" />,
  },
  {
    title: "Innovating Agriculture",
    desc: "Exploring modern agri-tech, data-driven tools, and green innovations for a smarter, sustainable future.",
    icon: (
      <PrecisionManufacturing fontSize="large" className="text-green-600" />
    ),
  },
];

const CoreValues = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <Typography
            variant="h4"
            className="!font-semibold text-gray-800 mb-4 leading-snug"
          >
            What Drives Us
          </Typography>
        </div>

        <div className="mb-16 text-center flex items-center justify-center">
          <Typography className="text-gray-600 max-w-2xl mx-auto text-base mb-16 leading-relaxed">
            At NextBlog, our mission is rooted in purpose — to empower farmers,
            enthusiasts, and changemakers through stories that matter, tech that
            evolves, and a shared love for the land.
          </Typography>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-left">
          {coreValues.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <Typography
                variant="h6"
                className="text-green-700 font-semibold mb-2"
              >
                {item.title}
              </Typography>
              <Typography className="text-sm text-gray-700 leading-relaxed">
                {item.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
