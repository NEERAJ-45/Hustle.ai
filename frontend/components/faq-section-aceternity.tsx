"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export function FaqSectionAceternity() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI job matching work?",
      answer:
        "Our AI analyzes your profile, skills, experience, and preferences to match you with relevant job opportunities. It uses natural language processing and machine learning to understand job descriptions and calculate compatibility scores between your profile and available positions.",
    },
    {
      question: "Is my data safe and private?",
      answer:
        "Absolutely. We use bank-level encryption to protect your data and are fully GDPR compliant. You have complete control over what information is shared with potential employers. We never sell your data to third parties, and you can delete your account and all associated data at any time.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes! You can cancel your subscription at any time with no penalties or hidden fees. Your access will continue until the end of your billing period, and you won't be charged again.",
    },
    {
      question: "How many applications can I send?",
      answer:
        "It depends on your plan. Free users get 5 job matches per month, Pro users get 50 applications per month, and Enterprise users have unlimited applications. Each application includes a customized resume and cover letter optimized for that specific job.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with Hustle.ai for any reason within the first 14 days, contact our support team for a full refund.",
    },
    {
      question: "What countries do you support?",
      answer:
        "Hustle.ai supports job searches in over 50 countries across North America, Europe, Asia, and Australia. We integrate with major job boards in each region and support multiple languages including English, Spanish, French, German, and Mandarin.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-black relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-400 font-medium text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Questions
            </span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Everything you need to know about Hustle.ai
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-slate-950/50 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0">
                  {openIndex === index ? (
                    <IconMinus className="h-5 w-5 text-blue-400" />
                  ) : (
                    <IconPlus className="h-5 w-5 text-neutral-400" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
