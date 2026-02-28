"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  TrendingUp,
  Filter,
  Send,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    match: 98,
    posted: "2 hours ago",
    description: "Leading tech company seeking experienced React developer...",
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    saved: false,
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    match: 95,
    posted: "5 hours ago",
    description:
      "Fast-growing startup looking for versatile full-stack engineer...",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    saved: true,
  },
  {
    id: 3,
    title: "React Native Developer",
    company: "MobileFirst",
    location: "New York, NY",
    type: "Contract",
    salary: "$130k - $180k",
    match: 92,
    posted: "1 day ago",
    description: "Mobile-first company building next-generation apps...",
    skills: ["React Native", "iOS", "Android", "Firebase"],
    saved: false,
  },
  {
    id: 4,
    title: "Frontend Team Lead",
    company: "Enterprise Corp",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$160k - $210k",
    match: 89,
    description: "Leadership role managing frontend team of 8 engineers...",
    skills: ["Leadership", "React", "Vue", "Architecture"],
    saved: false,
  },
  {
    id: 5,
    title: "UI/UX Engineer",
    company: "DesignStudio",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $150k",
    match: 87,
    posted: "3 days ago",
    description:
      "Creative agency seeking engineer with strong design skills...",
    skills: ["React", "Figma", "CSS", "Animation"],
    saved: true,
  },
];

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5]);

  const toggleSave = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Find Your Dreams Job</h1>
              <p className="text-white/80">
                AI-powered job matching finds the perfect opportunities for you
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-gray-700">
                    Job Title or Keywords
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="e.g. Frontend Engineer"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="City or Remote"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-10 bg-linear-to-r from-[#334e68] to-[#2563eb]">
                    <Search className="w-4 h-4 mr-2" />
                    Search Jobs
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Matches", value: 47, icon: Briefcase },
            { label: "New Today", value: 12, icon: Clock },
            {
              label: "Avg Match Rate",
              value: 94,
              suffix: "%",
              icon: TrendingUp,
            },
            { label: "Saved Jobs", value: savedJobs.length, icon: Bookmark },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <stat.icon className="w-5 h-5 text-[#2563eb]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Salary Range</Label>
                  <Slider
                    defaultValue={[80]}
                    max={300}
                    step={10}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$80k</span>
                    <span>$300k+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Match Score</Label>
                  <Slider
                    defaultValue={[85]}
                    max={100}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-sm text-gray-600 text-center">
                    85%+ match
                  </p>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{jobListings.length}</span> jobs
              </p>
              <Select defaultValue="match">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-4">
                              <span className="font-medium">{job.company}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSave(job.id)}
                            className="shrink-0"
                          >
                            <Bookmark
                              className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-[#2563eb] text-[#2563eb]" : ""}`}
                            />
                          </Button>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <Button className="bg-linear-to-r from-[#334e68] to-[#2563eb]">
                            <Send className="w-4 h-4 mr-2" />
                            Quick Apply
                          </Button>
                          <Button variant="outline">View Details</Button>
                          <Badge
                            className={
                              job.match >= 95
                                ? "bg-green-100 text-green-700 ml-auto"
                                : job.match >= 90
                                  ? "bg-blue-100 text-blue-700 ml-auto"
                                  : "bg-amber-100 text-amber-700 ml-auto"
                            }
                          >
                            <AnimatedNumber value={job.match} suffix="%" />{" "}
                            match
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
