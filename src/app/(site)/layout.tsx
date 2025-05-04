import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "NextBlog - Discover Modern Farming & Green Insights",
  description:
    "NextBlog brings you the latest stories, tips, and insights on modern farming, sustainability, and agriculture trends.",
  keywords:
    "NextBlog, agriculture blog, sustainable farming, green farming, modern agriculture, eco-friendly farming",
  authors: [{ name: "NextBlog Team" }],
  openGraph: {
    title: "NextBlog - Discover Modern Farming & Green Insights",
    description:
      "NextBlog brings you the latest stories, tips, and insights on modern farming, sustainability, and agriculture trends.",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "NextBlog",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "NextBlog - Green Farming",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextBlog - Discover Modern Farming & Green Insights",
    description:
      "Read blog posts on sustainable agriculture, green practices, and farming innovations with NextBlog.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function SiteLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[80px] px-4 sm:px-6 lg:px-8">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
