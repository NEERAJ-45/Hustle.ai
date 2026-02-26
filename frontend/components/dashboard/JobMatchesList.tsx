import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { jobMatches } from "./dashboardData";

export default function JobMatchesList() {
  return (
    <div className="space-y-4">
      {jobMatches.map((job) => (
        <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                <p className="text-xs text-gray-500">{job.salary}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-blue-600 font-bold">{job.match}% Match</span>
                <span className="text-xs text-gray-400">{job.posted}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
