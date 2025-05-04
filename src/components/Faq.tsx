"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

const faqs = [
  {
    question: "How is delivery impacted by weather?",
    answer:
      "Delivery schedules may shift depending on weather conditions to ensure safety and quality of service.",
  },
  {
    question: "Are there penalties for non-availability?",
    answer:
      "No, but we appreciate early notice so we can adjust our routes accordingly.",
  },
  {
    question: "Is my subscription impacted by rescheduling?",
    answer:
      "No, your subscription remains active. Only delivery timing is affected.",
  },
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h5"
          className="!font-semibold text-gray-800 text-lg sm:text-xl"
          sx={{ marginBottom: "8px" }}
        >
          Got a Question?
        </Typography>
        <Typography
          className="text-gray-600 max-w-2xl mb-6 text-sm sm:text-base"
          sx={{ marginBottom: "12px" }}
        >
          We’re here to answer. Explore the most common queries from our
          community.
        </Typography>

        <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              elevation={0}
              disableGutters
              square
              className="bg-white"
              sx={{ "&::before": { display: "none" } }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === index ? (
                    <RemoveIcon className="text-green-600" />
                  ) : (
                    <AddIcon className="text-green-600" />
                  )
                }
                sx={{
                  py: 1.5,
                  px: 2,
                  "& .MuiTypography-root": {
                    fontWeight: 500,
                    color: "#1F2937",
                  },
                }}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2, pb: 2 }}>
                <Typography variant="body2" className="text-gray-600">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
