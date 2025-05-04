"use client";

import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Send,
} from "@mui/icons-material";

const footerLinks = [
  {
    title: "Company",
    links: [
      "Careers",
      "Privacy & Notice",
      "Terms",
      "Cookie Policy",
      "Down Status",
    ],
  },
  {
    title: "Support",
    links: ["How it works", "Pricing", "Help Center", "Mobile App", "Blogs"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        {/* Footer Links */}
        {footerLinks.map((section, index) => (
          <div key={index}>
            <Typography
              variant="h6"
              className="!text-white !font-semibold mb-4"
            >
              {section.title}
            </Typography>
            <ul className="space-y-2 text-sm">
              {section.links.map((item, i) => (
                <li key={i} className="hover:text-green-400 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter & Social */}
        <div className="md:col-span-2 mb-12">
          <Typography variant="h6" className="!text-white !font-semibold mb-4">
            Newsletter
          </Typography>
          <Typography className="text-sm mb-4 max-w-md">
            Subscribe to get our latest agriculture insights and updates.
          </Typography>

          <div className="max-w-md mt-6">
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your email"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <Send className="text-green-500" />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { backgroundColor: "white", borderRadius: "6px" },
              }}
            />
          </div>

          <div className="flex space-x-4 mt-6">
            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, idx) => (
              <IconButton key={idx}>
                <Icon className="text-white hover:text-green-500" />
              </IconButton>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} NextBlog. Made by{" "}
        <span className="text-white">Tanushree</span>. All rights reserved.
      </div>
    </footer>
  );
}
