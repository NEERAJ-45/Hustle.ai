"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { EncryptedText } from "@/components/ui/encrypted-text";
import {
  IconMail,
  IconLock,
  IconUser,
  IconBrandGoogle,
  IconArrowRight,
  IconLoader2,
  IconBrain,
  IconFileText,
  IconChartBar,
  IconRocket,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
      isSignup: true,
    });
    setIsLoading(false);
    if (res?.error) {
      setError("Could not create account. Try again.");
    } else {
      router.push("/dashboard");
    }
  };

  const features = [
    { icon: IconBrain, text: "AI-powered job matching" },
    { icon: IconFileText, text: "One-click resume builder" },
    { icon: IconChartBar, text: "Smart analytics dashboard" },
    { icon: IconRocket, text: "Automated outreach" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel: branding ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-neutral-950 p-12 lg:flex">
        <Spotlight className="-top-40 left-10" fill="rgba(139,92,246,0.35)" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]" />

        <div className="relative z-10">
          <Link href="/" className="mb-16 inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-sm font-bold text-white">H</span>
            </div>
            <span className="text-xl font-bold text-white">Hustle.ai</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white">
              <EncryptedText
                text="Start your"
                revealDelayMs={60}
                encryptedClassName="text-violet-400/50"
              />
              <br />
              <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                <EncryptedText
                  text="AI-powered hustle."
                  revealDelayMs={70}
                  encryptedClassName="opacity-50"
                />
              </span>
            </h1>
            <p className="mb-10 max-w-sm text-neutral-400">
              Create your free account and let AI handle the heavy lifting of
              your job search.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <f.icon className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <span className="text-sm text-neutral-300">{f.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="relative z-10 text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} Hustle.ai &mdash; All rights
          reserved.
        </p>
      </div>

      {/* ── Right panel: signup form ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-black px-6 py-12">
        {/* Mobile logo */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 lg:hidden"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <span className="text-sm font-bold text-white">H</span>
          </div>
          <span className="text-lg font-bold text-white">Hustle.ai</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <h2 className="mb-1 text-2xl font-bold text-white">
            <EncryptedText
              text="Create account"
              revealDelayMs={55}
              encryptedClassName="text-blue-400/50"
            />
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Google */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <IconBrandGoogle className="h-4.5 w-4.5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-neutral-600">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-400">
                Name
              </label>
              <div className="relative">
                <IconUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-400">
                Email
              </label>
              <div className="relative">
                <IconMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-400">
                Password
              </label>
              <div className="relative">
                <IconLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  {showPassword ? (
                    <IconEyeOff className="h-4 w-4" />
                  ) : (
                    <IconEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? (
                <IconLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create account
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-600">
            By signing up you agree to our{" "}
            <Link href="#" className="text-neutral-400 hover:text-neutral-300">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-neutral-400 hover:text-neutral-300">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
