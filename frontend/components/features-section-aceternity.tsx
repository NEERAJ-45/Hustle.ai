"use client";

import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  IconBrain,
  IconFileText,
  IconBolt,
  IconChartBar,
  IconShield,
  IconWorld,
} from "@tabler/icons-react";

export function FeaturesSectionAceternity() {
  const features = [
    {
      title: "AI Job Matching",
      description:
        "Advanced algorithms analyze your profile and match you with the perfect opportunities based on skills, experience, and preferences.",
      icon: <IconBrain className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Smart Resume Builder",
      description:
        "AI-powered resume optimization that adapts to each job application, ensuring maximum ATS compatibility and recruiter appeal.",
      icon: <IconFileText className="h-6 w-6 text-purple-400" />,
    },
    {
      title: "One-Click Apply",
      description:
        "Apply to hundreds of jobs with a single click. Our automation handles forms, uploads, and submissions across all major job boards.",
      icon: <IconBolt className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track your job search progress with detailed analytics, response rates, and actionable insights to improve your success rate.",
      icon: <IconChartBar className="h-6 w-6 text-amber-400" />,
    },
    {
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. Full control over what information is shared and with whom. GDPR compliant and transparent.",
      icon: <IconShield className="h-6 w-6 text-rose-400" />,
    },
    {
      title: "Global Job Market",
      description:
        "Access opportunities from around the world. Support for multiple languages, currencies, and region-specific job boards.",
      icon: <IconWorld className="h-6 w-6 text-cyan-400" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <p className="text-blue-400 font-medium text-sm uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Succeed
            </span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Powerful features designed to optimize every aspect of your job
            search journey.
          </p>
        </div>

        <HoverEffect items={features} />
      </div>
    </section>
  );
}
