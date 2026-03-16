"use client";

import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  IconCheck,
  IconShieldCheck,
  IconArrowRight,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    tagline: "Explore at your own pace",
    features: [
      { text: "5 AI job matches / month", included: true },
      { text: "Basic resume builder", included: true },
      { text: "Job alerts", included: true },
      { text: "Email support", included: true },
      { text: "One-click apply", included: false },
      { text: "Analytics dashboard", included: false },
    ],
    cta: "Get Started",
    href: "/signup",
    accent: "neutral" as const,
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 24,
    tagline: "Everything you need to land offers",
    badge: "Most Popular",
    features: [
      { text: "50 AI job matches / month", included: true },
      { text: "AI resume & cover letter builder", included: true },
      { text: "One-click applications", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Priority support", included: true },
      { text: "Interview prep tools", included: true },
    ],
    cta: "Start 14-Day Free Trial",
    href: "/signup",
    accent: "blue" as const,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    annualPrice: 79,
    tagline: "White-glove service for execs & teams",
    features: [
      { text: "Unlimited job matches", included: true },
      { text: "Executive resume service", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Salary negotiation coaching", included: true },
      { text: "LinkedIn profile optimization", included: true },
      { text: "24/7 priority support", included: true },
    ],
    cta: "Contact Sales",
    href: "/signup",
    accent: "purple" as const,
  },
];

export function PricingSectionAceternity() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative overflow-hidden bg-black py-28">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-400"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Invest in your career,{" "}
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              not job boards
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-400"
          >
            Cancel anytime. No hidden fees. Every plan includes a 14-day money-back guarantee.
          </motion.p>

          {/* ── Toggle ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 inline-flex items-center gap-3"
          >
            <span
              className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-neutral-500"}`}
            >
              Monthly
            </span>
            <button
              aria-label="Toggle annual billing"
              onClick={() => setIsAnnual((v) => !v)}
              className="relative h-7 w-12 rounded-full bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-blue-500"
                animate={{ x: isAnnual ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-neutral-500"}`}
            >
              Annual
            </span>
            <AnimatePresence>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="ml-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
                >
                  Save 17%
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <div className="grid items-start gap-5 md:grid-cols-3">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isPro = plan.accent === "blue";

            const cardContent = (
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  isPro
                    ? "border-transparent bg-[#0a0f1e]"
                    : "border-white/6 bg-neutral-950"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3.5 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-500/25">
                      <IconSparkles className="h-3 w-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name + tagline */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl font-extrabold tracking-tight text-white"
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                    {price > 0 && (
                      <span className="text-sm text-neutral-500">/mo</span>
                    )}
                  </div>
                  {isAnnual && plan.annualPrice < plan.monthlyPrice && (
                    <p className="mt-1.5 text-xs text-neutral-600">
                      <span className="text-neutral-500 line-through">
                        ${plan.monthlyPrice}/mo
                      </span>{" "}
                      &middot; billed ${plan.annualPrice * 12}/yr
                    </p>
                  )}
                  {price === 0 && (
                    <p className="mt-1.5 text-xs text-neutral-500">
                      Free forever — no card needed
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`group mb-8 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    isPro
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                      : "border border-white/10 text-neutral-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {plan.cta}
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* Divider */}
                <div className="mb-5 h-px bg-white/6" />

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <IconX className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
                      )}
                      <span
                        className={`text-sm ${
                          f.included ? "text-neutral-300" : "text-neutral-600"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className={isPro ? "md:-mt-4 md:-mb-4" : ""}
              >
                {isPro ? (
                  <BackgroundGradient
                    className="rounded-2xl p-px"
                    containerClassName=""
                  >
                    {cardContent}
                  </BackgroundGradient>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-neutral-500"
        >
          <span className="flex items-center gap-1.5">
            <IconShieldCheck className="h-4 w-4 text-emerald-500" />
            14-day money-back guarantee
          </span>
          <span className="hidden h-3.5 w-px bg-neutral-800 sm:block" />
          <span>No long-term contracts</span>
          <span className="hidden h-3.5 w-px bg-neutral-800 sm:block" />
          <span>Cancel in one click</span>
        </motion.div>
      </div>
    </section>
  );
}
