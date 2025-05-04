"use client";

import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendMessageMutation } from "@/redux/api/contactApi";
import { useSnackbar } from "notistack";
import HeroSection from "@/components/HeroSection";

const contactSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMessage(data).unwrap();
      enqueueSnackbar("Message sent successfully!", { variant: "success" });
      reset();
    } catch (err) {
      console.log(err);
      
      enqueueSnackbar("Failed to send message. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="We’d Love to Hear From You"
        description="Whether you have a question, feedback, or a partnership idea — the team at NextBlog is always open to connecting. Your thoughts help us grow stronger and serve our readers better. Drop us a message anytime, and we’ll get back to you as soon as possible. Let’s build a thriving agricultural community together."
        buttonText="Explore"
        imageUrl="https://images.unsplash.com/photo-1670471101287-c9ee61efe416?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Contact Us - NextBlog"
        link="/service"
      />

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
          {/* ✅ Contact Form */}
          <form
            className="space-y-6 flex gap-4 flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={5}
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
            <Button
              type="submit"
              variant="contained"
              className="!bg-green-600 hover:!bg-green-700 text-white rounded-full px-6"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <div>
              <Typography
                variant="h6"
                className="text-green-700 font-medium mb-2"
              >
                Contact Info
              </Typography>
              <p>Email: contact@nextblog.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>

            <div>
              <Typography
                variant="h6"
                className="text-green-700 font-medium mb-2"
              >
                Address
              </Typography>
              <p>NextBlog HQ</p>
              <p>123 Green Field Lane</p>
              <p>Pune, Maharashtra – 411001</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
