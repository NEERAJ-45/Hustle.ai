"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import {
  IconUser,
  IconSearch,
  IconFileText,
  IconSend,
  IconCalendar,
  IconTrophy,
} from "@tabler/icons-react";

export function HowItWorksSectionAceternity() {
  const data = [
    {
      title: "Create Profile",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Set up your professional profile with skills, experience, and career
            goals. Our AI analyzes your background to understand your strengths.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "AI analyzes your background",
              "Identify key strengths",
              "Set career preferences",
              "Import from LinkedIn",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 p-3"
              >
                <IconUser className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "AI Job Matching",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Our intelligent algorithm scans thousands of jobs daily to find your
            perfect matches with personalized compatibility scores.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Daily job scanning",
              "Personalized matching",
              "Priority ranking",
              "Smart notifications",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 p-3"
              >
                <IconSearch className="h-4 w-4 text-purple-400 shrink-0" />
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Resume Optimization",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            AI customizes your resume and generates tailored cover letters for
            each role, ensuring ATS compatibility and maximum impact.
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-4">
              {[
                { label: "ATS Score", value: 95, color: "bg-emerald-500" },
                { label: "Keywords", value: 87, color: "bg-blue-500" },
                { label: "Formatting", value: 92, color: "bg-purple-500" },
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300">{metric.label}</span>
                    <span className="text-white font-medium">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${metric.color} rounded-full`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "One-Click Apply",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Apply to multiple jobs instantly with your optimized resume. We
            handle all form filling and submissions automatically.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Batch applications",
              "Auto-fill forms",
              "Instant submissions",
              "Cross-platform support",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 p-3"
              >
                <IconSend className="h-4 w-4 text-rose-400 shrink-0" />
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Interview Prep",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Track responses, manage interviews, and get AI-powered preparation
            tips tailored to each company and role.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Schedule management",
              "Mock interviews",
              "Company research",
              "Question prep",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 p-3"
              >
                <IconCalendar className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-neutral-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Land Your Dream Job",
      content: (
        <div>
          <p className="text-neutral-200 text-sm md:text-base font-normal mb-8">
            Receive offer negotiation support and secure the best compensation
            package. Your journey to the perfect role ends here.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "94%", label: "Success Rate" },
              { value: "3 weeks", label: "Avg. Time" },
              { value: "2.5k+", label: "Jobs Landed" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-white/10"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-blue-400 font-medium text-sm uppercase tracking-wider mb-3">
            Process
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How It{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
              Works
            </span>
          </h2>
          <p className="text-neutral-400 text-lg">
            From profile setup to dream job — six steps powered by AI
          </p>
        </div>
      </div>
      <Timeline data={data} />
    </section>
  );
}
