"use client";

import React from "react";

export default function DashboardHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Removed gradient backgrounds */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">
            Your job search is performing great. Keep up the momentum!
          </p>
        </div>
      </div>
    </div>
  );
}
