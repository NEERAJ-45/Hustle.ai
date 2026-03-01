"use client";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownLogoutToast = useRef(false);

  useEffect(() => {
    if (
      searchParams?.get("loggedOut") === "1" &&
      !hasShownLogoutToast.current
    ) {
      hasShownLogoutToast.current = true;
      toast.success("You have been signed out successfully.");
      router.replace("/login");
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setIsLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password.");
    } else {
      router.push("/dashboard?loginSuccess=1");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-row bg-gray-50">
      {/* Left: Branding & Info */}
      <div className="hidden md:flex flex-col justify-between items-start w-1/2 bg-linear-to-br from-[#3b2ff6] to-[#2a1a7c] p-14 text-white min-h-screen shadow-xl">
        <div className="w-full">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/logo.svg"
              alt="Hustle.ai Logo"
              className="h-10 w-10 rounded-full bg-white/10 p-1"
            />
            <span className="text-3xl font-extrabold tracking-tight">
              Hustle.ai
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Automate. Apply. Achieve.
          </h1>
          <p className="mb-8 text-lg text-white/90 max-w-md">
            Unlock your career potential with AI-powered tools for job seekers
            and sales pros.{" "}
            <span className="font-semibold text-white">
              Save time, get matched, and stand out.
            </span>
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"
                  />
                </svg>
              </span>
              <span>Personalized job matching</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 018 0v2M5 10h14M12 14v7"
                  />
                </svg>
              </span>
              <span>1-click resume & cover letter</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1"
                  />
                </svg>
              </span>
              <span>Smart analytics dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 20l9-5-9-5-9 5 9 5zm0-10V4m0 0L3 9m9-5l9 5"
                  />
                </svg>
              </span>
              <span>Automated outreach & follow-up</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-white/60 mt-auto">
          © 2026 Hustle.ai. All rights reserved.
        </span>
      </div>
      {/* Right: Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 bg-white">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-2">Welcome Back Hustler!</h2>
          <p className="mb-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Create a new account now.
            </a>
            <br />
            It's FREE! Takes less than a minute.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login Now"}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border mt-2 py-2 rounded-lg bg-white hover:bg-gray-50 transition"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/dashboard?loginSuccess=1",
                })
              }
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>
          <div className="flex justify-between mt-4 text-sm">
            <span className="text-gray-500">Forgot password?</span>
            <a href="#" className="text-blue-600 hover:underline">
              Click here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
