import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { applications } from "./dashboardData";

export default function ApplicationsList() {
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <motion.div key={app.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{app.job}</h3>
                <p className="text-sm text-gray-600">{app.status}</p>
                <p className="text-xs text-gray-500">{app.stage} • {app.date}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
