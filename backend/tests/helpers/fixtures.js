// tests/helpers/fixtures.js
const mongoose = require("mongoose");

const objectId = () => new mongoose.Types.ObjectId();

const makeUser = (overrides = {}) => ({
  _id: objectId(),
  name: "Test User",
  email: "test@example.com",
  password: "Test@1234",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const makeJob = (overrides = {}) => ({
  _id: objectId(),
  title: "Software Engineer",
  description: "Build things",
  requirements: "3+ years experience",
  company: {
    name: "TestCorp",
    website: "https://testcorp.example.com",
    size: "51-200",
    industry: "Technology",
  },
  location: {
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    isRemote: false,
    workArrangement: "On-site",
  },
  jobType: "Full-Time",
  experienceLevel: "Mid",
  requiredSkills: [{ name: "Node.js", importance: "Required" }],
  salary: { min: 800000, max: 1500000, currency: "INR", period: "Yearly" },
  applicationMethod: "Platform",
  source: { platform: "HustleAI" },
  isActive: true,
  isVerified: false,
  applicationCount: 0,
  viewCount: 0,
  postedDate: new Date(),
  ...overrides,
});

const makeResume = (userId, overrides = {}) => ({
  _id: objectId(),
  userId,
  title: "My Resume",
  fileInfo: {
    filename: "resume-123.pdf",
    originalName: "resume.pdf",
    filePath: "/uploads/resumes/resume-123.pdf",
    fileSize: 50000,
    mimeType: "application/pdf",
  },
  createdAt: new Date(),
  ...overrides,
});

const makeCoverLetter = (userId, overrides = {}) => ({
  _id: objectId(),
  userId,
  jobId: objectId(),
  content: "Dear Hiring Manager, I am excited to apply...",
  createdAt: new Date(),
  ...overrides,
});

const makeApplication = (userId, jobId, overrides = {}) => ({
  _id: objectId(),
  userId,
  jobId,
  status: { current: "Submitted" },
  interviews: [],
  communications: [],
  appliedAt: new Date(),
  createdAt: new Date(),
  ...overrides,
});

const makeJobMatch = (userId, jobId, overrides = {}) => ({
  _id: objectId(),
  userId,
  jobId,
  matchScore: 85,
  status: "New",
  isActive: true,
  createdAt: new Date(),
  ...overrides,
});

module.exports = {
  objectId,
  makeUser,
  makeJob,
  makeResume,
  makeCoverLetter,
  makeApplication,
  makeJobMatch,
};
