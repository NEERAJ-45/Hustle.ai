"use client";

import React from "react";

export default function DashboardHeader() {
  return (
    <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome back, Neeraj!</h1>
          <p className="text-white/80">
            Your job search is performing great. Keep up the momentum!
          </p>
        </div>
      </div>
    </div>
  );
}
