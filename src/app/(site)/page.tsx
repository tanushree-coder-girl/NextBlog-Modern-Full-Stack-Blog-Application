"use client";

import MainHero from "@/components/MainHero";
import TrendingArticles from "@/components/TrendingArticles";
import Explore from "@/components/Explore";
import Faq from "@/components/Faq";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <MainHero />
      <TrendingArticles />
      <Explore />
      <Faq />
    </main>
  );
}
