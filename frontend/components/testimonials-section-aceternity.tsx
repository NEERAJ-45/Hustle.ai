"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TestimonialsSectionAceternity() {
  const testimonials = [
    {
      quote:
        "Hustle.ai completely transformed my job search. I went from sending 10 applications a week to 50+ with personalized resumes for each. Got 3 interviews in my first week!",
      name: "Sarah Chen",
      title: "Software Engineer @ Google",
    },
    {
      quote:
        "The AI matching is incredible. Every job recommendation was relevant to my skills and career goals. I landed my dream role in just 3 weeks of using the platform.",
      name: "Michael Rodriguez",
      title: "Product Manager @ Meta",
    },
    {
      quote:
        "As a career changer, I was overwhelmed by the job search process. Hustle.ai made it so much easier — the resume optimization alone was worth it.",
      name: "Emily Taylor",
      title: "UX Designer @ Apple",
    },
    {
      quote:
        "The analytics dashboard helped me understand what was working and what wasn't. I optimized my approach and doubled my response rate in two weeks.",
      name: "David Kim",
      title: "Data Scientist @ Amazon",
    },
    {
      quote:
        "I was skeptical at first, but the AI job matching is legitimately better than anything I've tried. The interview prep features are a game changer too.",
      name: "Jessica Park",
      title: "Engineering Manager @ Stripe",
    },
    {
      quote:
        "Went from mass applying to targeted, optimized applications. The difference in callback rate was night and day. Highly recommend for any serious job seeker.",
      name: "Alex Thompson",
      title: "DevOps Engineer @ Netflix",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-400 font-medium text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Trusted by Job Seekers{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Worldwide
            </span>
          </h2>
          <p className="text-neutral-400 text-lg">
            See how Hustle.ai has helped professionals land their dream roles
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "2.5k+", label: "Active Users" },
              { value: "94%", label: "Match Rate" },
              { value: "47 days", label: "Avg. to Offer" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <InfiniteMovingCards
          items={testimonials.slice(0, 3)}
          direction="right"
          speed="slow"
        />
        <InfiniteMovingCards
          items={testimonials.slice(3)}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
}
