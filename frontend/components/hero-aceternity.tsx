"use client";

import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { MovingBorder } from "@/components/ui/moving-border";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconRocket,
  IconArrowRight,
  IconBrain,
  IconFileText,
  IconTargetArrow,
  IconChartBar,
  IconCheck,
  IconStar,
} from "@tabler/icons-react";

export function HeroAceternity() {
  const flipWords = ["10x Faster", "Effortlessly", "Intelligently", "Smarter"];
  const { scrollY } = useScroll();
  const dashboardY = useTransform(scrollY, [0, 600], [0, -80]);
  const dashboardOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="top-20 -right-40 md:-right-20"
        fill="rgba(59,130,246,0.4)"
      />

      {/* ── ABOVE THE FOLD: Centered text + CTAs ── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-32">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[13px] font-medium tracking-wide text-blue-400">
              AI-Powered Career Platform
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
            <br />
            <FlipWords
              words={flipWords}
              className="text-blue-500"
              duration={2500}
            />
          </h1>

          {/* Subtitle */}
          <div className="mx-auto mt-6 max-w-2xl">
            <TextGenerateEffect
              words="Stop wasting hours on job boards. Hustle.ai matches you to the right roles, tailors your resume, and applies — all on autopilot."
              className="text-base font-normal leading-relaxed text-neutral-400 md:text-lg"
              duration={0.25}
            />
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/signup">
              <MovingBorder
                duration={3000}
                containerClassName="h-12 w-56 rounded-full"
                className="gap-2 rounded-full bg-slate-950 font-semibold text-white"
                borderClassName="bg-[conic-gradient(from_0deg,transparent_0_340deg,#3b82f6_360deg)]"
              >
                <IconRocket className="h-4 w-4" />
                Get Started Free
              </MovingBorder>
            </Link>
            <Link
              href="#how-it-works"
              className="group flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-8 font-medium text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
            >
              See How It Works
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500"
          >
            <span className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-emerald-500" />
              No credit card required
            </span>
            <span className="hidden h-3.5 w-px bg-neutral-700 sm:block" />
            <span className="flex items-center gap-1.5">
              <IconStar className="h-4 w-4 text-amber-500" />
              4.9/5 from 2,500+ users
            </span>
            <span className="hidden h-3.5 w-px bg-neutral-700 sm:block" />
            <span className="flex items-center gap-1.5">
              <IconRocket className="h-4 w-4 text-blue-500" />
              Setup in under 2 minutes
            </span>
          </motion.div>
        </div>

        {/* ── DASHBOARD MOCKUP ── */}
        <motion.div
          style={{ y: dashboardY, opacity: dashboardOpacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto mt-20 w-full max-w-5xl px-4"
        >
          {/* Glow behind the card */}
          <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-3xl" />

          <div className="relative rounded-2xl border border-white/10 bg-linear-to-b from-neutral-900/80 to-neutral-950 p-1 shadow-2xl shadow-blue-500/5 backdrop-blur-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <div className="ml-4 flex-1 rounded-md bg-white/5 px-4 py-1 text-center text-xs text-neutral-600">
                app.hustle.ai/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid gap-4 p-5 md:grid-cols-3">
              {/* Left panel – job matches */}
              <div className="md:col-span-2 space-y-3">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconBrain className="h-5 w-5 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Top Matches
                    </h3>
                  </div>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                    3 new today
                  </span>
                </div>
                {[
                  {
                    role: "Senior Frontend Engineer",
                    co: "Stripe",
                    match: 98,
                    tags: ["React", "TypeScript"],
                  },
                  {
                    role: "Full Stack Developer",
                    co: "Vercel",
                    match: 95,
                    tags: ["Next.js", "Node"],
                  },
                  {
                    role: "Product Engineer",
                    co: "Linear",
                    match: 92,
                    tags: ["React", "GraphQL"],
                  },
                ].map((job, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex items-center justify-between rounded-xl bg-white/3 p-3.5 transition-colors hover:bg-white/6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {job.role}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        {job.co}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden gap-1.5 sm:flex">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-neutral-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
                        {job.match}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right panel – stats sidebar */}
              <div className="space-y-4">
                {/* Resume score */}
                <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Resume Score
                  </p>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-white">94</span>
                    <span className="mb-1 text-sm text-emerald-400">
                      +12 pts
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: "94%" }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Applications */}
                <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    This Week
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { n: "47", label: "Applied", icon: IconFileText },
                      { n: "12", label: "Interviews", icon: IconTargetArrow },
                      { n: "6", label: "Shortlisted", icon: IconChartBar },
                      { n: "3", label: "Offers", icon: IconStar },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <s.icon className="mx-auto mb-1 h-4 w-4 text-neutral-600" />
                        <p className="text-lg font-bold text-white">{s.n}</p>
                        <p className="text-[10px] text-neutral-500">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-neutral-600 uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-5 rounded-full border border-neutral-700 p-1"
          >
            <div className="h-1.5 w-full rounded-full bg-neutral-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
