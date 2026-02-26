import React from "react";
import { motion } from "framer-motion";
import { Target, Briefcase, FileText, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

const stats = [
  { label: "Job Matches", value: 47, icon: Target, color: "text-[#2563eb]", bgColor: "bg-blue-100" },
  { label: "Applications Sent", value: 23, icon: Briefcase, color: "text-[#334e68]", bgColor: "bg-blue-50" },
  { label: "Interviews", value: 5, icon: FileText, color: "text-[#2563eb]", bgColor: "bg-blue-100" },
  { label: "Offers", value: 2, icon: TrendingUp, color: "text-[#334e68]", bgColor: "bg-blue-50" },
];

export default function DashboardStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat) => (
        <div key={stat.label} className={`flex items-center gap-4 p-6 rounded-xl shadow bg-white ${stat.bgColor}`}>
          <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
