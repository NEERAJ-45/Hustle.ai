import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { resumes } from "./resumesData";
import { Badge } from "@/components/ui/badge";

export default function ResumesList() {
  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <Card key={resume.id} className="shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{resume.name}</h3>
              <p className="text-xs text-gray-500">Last updated: {resume.lastUpdated}</p>
              <div className="flex gap-2 mt-2">
                {resume.isPrimary && <Badge variant="default">Primary</Badge>}
                <Badge variant="secondary">Score: {resume.score}</Badge>
                <Badge variant="secondary">Keywords: {resume.keywords}</Badge>
                <Badge variant="secondary">Apps: {resume.applications}</Badge>
                <Badge variant="secondary">Success: {resume.successRate}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
