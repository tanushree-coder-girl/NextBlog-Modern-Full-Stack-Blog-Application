// src/app/service/page.tsx
"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import ServiceList from "@/components/ServiceList";

const Service = () => {
  return (
    <main className="bg-white">
      <HeroSection
        title="Empowering Tomorrow’s Farmers"
        description="Discover smart farming tools, expert advice, and sustainable practices that help you grow better — from the soil to the soul."
        buttonText="Get Started"
        imageUrl="https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Agri Services Hero"
        link="/blog"
      />
      <ServiceList />
    </main>
  );
};

export default Service;
