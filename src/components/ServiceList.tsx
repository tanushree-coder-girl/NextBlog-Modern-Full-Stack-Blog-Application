// src/components/ServiceList.tsx

import React from "react";
import { Typography } from "@mui/material";
import CardItem from "./CardItem";
import { services } from "@/data/serviceData";

const ServiceList = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center flex-col text-center">
          <div className="mb-4">
            <Typography
              variant="h4"
              className="!font-semibold text-gray-800 leading-tight"
            >
              Solutions We’re Proud Of
            </Typography>
          </div>

          <div className="text-center flex justify-center mb-8">
            <Typography className="text-gray-600 max-w-2xl text-base leading-relaxed">
              Whether you're nurturing crops or cultivating ideas, our services
              help you stay informed, inspired, and in sync with the green
              future.
            </Typography>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <CardItem
              key={index}
              image={service.img}
              title={service.title}
              description={service.desc}
              buttonText="Read More"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
