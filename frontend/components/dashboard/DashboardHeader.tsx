import React from "react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold">Welcome back, Neeraj!</h1>
          <p className="text-white/80">
            Your job search is performing great. Keep up the momentum!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
