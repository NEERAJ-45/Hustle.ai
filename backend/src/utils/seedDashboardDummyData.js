require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/user.model");
const Job = require("../models/job.model");
const Resume = require("../models/resume.model");
const Application = require("../models/Application.model");
const JobMatch = require("../models/job_match.model");

const MONGODB_URI = process.env.MONGODB_URI;

const DEMO_EMAIL = process.env.DEMO_USER_EMAIL || "neeraj@hustle.ai";
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || "Pass@1234";

const jobSeeds = [
  {
    title: "Frontend Engineer",
    company: { name: "Pixel Labs", industry: "SaaS", size: "Medium" },
    description:
      "Build performant frontend features using React and TypeScript.",
    requirements: "React, TypeScript, API integration",
    location: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      workArrangement: "Hybrid",
    },
    jobType: "Full-Time",
    experienceLevel: "Mid",
    requiredSkills: [
      { name: "React", importance: "Required" },
      { name: "TypeScript", importance: "Required" },
    ],
    salary: { min: 1200000, max: 1800000, currency: "INR", period: "Yearly" },
    source: { platform: "DemoSeed" },
  },
  { 
    title: "Full Stack Developer",
    company: { name: "Nova Systems", industry: "FinTech", size: "Large" },
    description: "Own end-to-end features across frontend and backend.",
    requirements: "Node.js, React, MongoDB",
    location: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      workArrangement: "On-site",
    },
    jobType: "Full-Time",
    experienceLevel: "Mid",
    requiredSkills: [
      { name: "Node.js", importance: "Required" },
      { name: "MongoDB", importance: "Required" },
    ],
    salary: { min: 1400000, max: 2200000, currency: "INR", period: "Yearly" },
    source: { platform: "DemoSeed" },
  },
  {
    title: "Senior React Developer",
    company: { name: "CloudOrbit", industry: "Cloud", size: "Enterprise" },
    description: "Lead frontend architecture and mentor engineers.",
    requirements: "React, Next.js, performance optimization",
    location: {
      city: "Remote",
      state: "NA",
      country: "India",
      isRemote: true,
      workArrangement: "Remote",
    },
    jobType: "Full-Time",
    experienceLevel: "Senior",
    requiredSkills: [
      { name: "Next.js", importance: "Required" },
      { name: "Performance", importance: "Preferred" },
    ],
    salary: { min: 1800000, max: 2800000, currency: "INR", period: "Yearly" },
    source: { platform: "DemoSeed" },
  },
  {
    title: "UI Engineer",
    company: { name: "DesignHive", industry: "DesignTech", size: "Small" },
    description: "Craft pixel-perfect and accessible UI components.",
    requirements: "CSS, accessibility, component systems",
    location: {
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      workArrangement: "Hybrid",
    },
    jobType: "Contract",
    experienceLevel: "Entry",
    requiredSkills: [
      { name: "CSS", importance: "Required" },
      { name: "Accessibility", importance: "Required" },
    ],
    salary: { min: 800000, max: 1200000, currency: "INR", period: "Yearly" },
    source: { platform: "DemoSeed" },
  },
  {
    title: "Backend Node Engineer",
    company: { name: "DataForge", industry: "Data", size: "Startup" },
    description: "Build APIs and optimize data pipelines.",
    requirements: "Node.js, Express, MongoDB",
    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      workArrangement: "On-site",
    },
    jobType: "Full-Time",
    experienceLevel: "Mid",
    requiredSkills: [
      { name: "Express", importance: "Required" },
      { name: "MongoDB", importance: "Required" },
    ],
    salary: { min: 1100000, max: 1700000, currency: "INR", period: "Yearly" },
    source: { platform: "DemoSeed" },
  },
];

async function getOrCreateDemoUser() {
  let user = await User.findOne({ email: DEMO_EMAIL }).select("+password");
  if (!user) {
    user = await User.create({
      name: "Demo User",
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
    console.log(`Created demo user: ${DEMO_EMAIL}`);
  } else {
    console.log(`Using existing user: ${DEMO_EMAIL}`);
  }
  return user;
}

async function getOrCreateResume(userId) {
  let resume = await Resume.findOne({ userId, title: "Demo Resume" });
  if (!resume) {
    resume = await Resume.create({
      userId,
      title: "Demo Resume",
      fileInfo: {
        filename: "demo-resume.pdf",
        originalName: "demo-resume.pdf",
        filePath: "/uploads/resumes/demo-resume.pdf",
        fileSize: 102400,
        mimeType: "application/pdf",
      },
      isDefault: true,
    });
    console.log("Created demo resume");
  }
  return resume;
}

async function upsertJobs() {
  const jobs = [];
  for (const seed of jobSeeds) {
    const existing = await Job.findOne({
      title: seed.title,
      "company.name": seed.company.name,
    });
    if (existing) {
      jobs.push(existing);
      continue;
    }

    const created = await Job.create({
      ...seed,
      postedDate: new Date(
        Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      ),
      isActive: true,
      isVerified: true,
    });
    jobs.push(created);
  }
  console.log(`Prepared ${jobs.length} jobs`);
  return jobs;
}

async function seedMatchesAndApplications(user, resume, jobs) {
  await JobMatch.deleteMany({
    userId: user._id,
    "aiAnalysis.aiModel": "demo-seeder-v1",
  });
  await Application.deleteMany({ userId: user._id, tags: "demo-seed" });

  const statusPool = ["New", "Applied", "Saved", "Viewed", "New"];
  const appStatusPool = [
    "Submitted",
    "Under Review",
    "Interview Scheduled",
    "Offer Received",
    "Rejected",
  ];

  for (let index = 0; index < jobs.length; index += 1) {
    const job = jobs[index];

    await JobMatch.create({
      userId: user._id,
      jobId: job._id,
      matchScore: 70 + index * 5,
      scoreBreakdown: {
        skillsMatch: {
          score: 70 + index * 4,
          matchedSkills: ["React", "Node.js"],
          missingSkills: ["GraphQL"],
        },
        experienceMatch: { score: 75, yearsMatch: true, roleMatch: true },
        locationMatch: {
          score: job.location?.isRemote ? 100 : 80,
          distance: 12,
          preferenceMatch: true,
        },
        salaryMatch: { score: 85, withinRange: true },
        preferenceMatch: { score: 82, jobTypeMatch: true, industryMatch: true },
      },
      aiAnalysis: {
        aiModel: "demo-seeder-v1",
        reasoning: "Good role fit based on profile and skills.",
        recommendations: ["Tailor resume summary", "Highlight React projects"],
        confidenceLevel: "High",
      },
      status: statusPool[index] || "New",
      isActive: true,
    });

    if (index < 4) {
      const statusCurrent = appStatusPool[index];
      const history = [
        {
          status: statusCurrent,
          note: "Seeded for dashboard demo",
          source: "System",
        },
      ];
      const interviews =
        statusCurrent === "Interview Scheduled"
          ? [
              {
                type: "Video",
                scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                duration: 45,
                interviewer: {
                  name: "Hiring Manager",
                  title: "Engineering Manager",
                  email: "hiring@company.com",
                },
                location: "Google Meet",
                meetingLink: "https://meet.google.com/demo-interview",
                status: "Scheduled",
              },
            ]
          : [];

      await Application.create({
        userId: user._id,
        jobId: job._id,
        resumeId: resume._id,
        status: {
          current: statusCurrent,
          history,
          lastUpdated: new Date(),
        },
        interviews,
        tags: ["demo-seed"],
        priority: "Medium",
        appliedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
      });
    }
  }

  console.log("Seeded dashboard matches and applications");
}

async function run() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB for seeding");

  const user = await getOrCreateDemoUser();
  const resume = await getOrCreateResume(user._id);
  const jobs = await upsertJobs();

  await seedMatchesAndApplications(user, resume, jobs);

  console.log("Dashboard dummy seed complete");
  console.log(`Demo user login: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);

  await mongoose.disconnect();
}

run()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error("Seeding failed:", error);
    try {
      await mongoose.disconnect();
    } catch {
      // ignore
    }
    process.exit(1);
  });
