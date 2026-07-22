const User = require("../models/user.model");
const Job = require("../models/job.model");
const Resume = require("../models/resume.model");
const { generateResumePDF } = require("./pdfGenerator");
const logger = require("../utils/logger");

const extractKeywords = (text) => {
  if (!text) return [];
  const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "shall", "can", "need", "must", "this", "that", "these", "those", "it", "its", "we", "they", "he", "she", "from", "as", "about", "into", "through", "during", "before", "after", "above", "below", "between", "such", "each", "all", "both", "few", "more", "most", "other", "some", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "just", "also", "well"]);
  const tokens = text.toLowerCase().replace(/[^a-z0-9\s#+.-]/g, " ").split(/\s+/).filter(Boolean);
  const freq = {};
  for (const t of tokens) {
    if (t.length > 2 && !stopWords.has(t)) {
      freq[t] = (freq[t] || 0) + 1;
    }
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([k]) => k);
};

const rankSkillsByJobRelevance = (userSkills, jobKeywords) => {
  if (!userSkills || userSkills.length === 0) return [];
  const keywordSet = new Set(jobKeywords);
  return userSkills
    .map((s) => {
      const name = (typeof s === "string" ? s : s.name || "").toLowerCase();
      const relevance = keywordSet.has(name) ? 2 : Array.from(keywordSet).some((kw) => name.includes(kw) || kw.includes(name)) ? 1 : 0;
      return { ...(typeof s === "string" ? { name: s } : s), _relevance: relevance };
    })
    .sort((a, b) => b._relevance - a._relevance);
};

const tailorResume = async (userId, jobId) => {
  const [user, job] = await Promise.all([User.findById(userId).lean(), Job.findById(jobId).lean()]);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  if (!job) {
    const err = new Error("Job not found");
    err.statusCode = 404;
    throw err;
  }

  const profile = user.profile || {};
  const jdText = [job.title, job.description, job.requirements, (job.requiredSkills || []).map((s) => s.name).join(" ")].filter(Boolean).join(" ");
  const jobKeywords = extractKeywords(jdText);

  const rankedSkills = rankSkillsByJobRelevance(profile.skills || [], jobKeywords);
  const jobTitle = job.title || "";

  const summaryParts = [];
  if (profile.bio) summaryParts.push(profile.bio);
  const topSkillNames = rankedSkills.slice(0, 5).map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean);
  if (topSkillNames.length > 0) {
    summaryParts.push(`Core competencies include ${topSkillNames.join(", ")}.`);
  }
  summaryParts.push(`Seeking a ${jobTitle} role where I can apply my expertise to drive impact.`);

  const pdfData = {
    name: user.name || "",
    email: user.email || "",
    phone: (profile.phone || ""),
    location: [profile.location?.city, profile.location?.state, profile.location?.country].filter(Boolean).join(", "),
    skills: rankedSkills,
    experience: profile.experience || [],
    education: profile.education || [],
    summary: summaryParts.join(" "),
    jobTitle,
  };

  const { filename, filePath, fileSize } = await generateResumePDF(pdfData);

  const resume = new Resume({
    userId: user._id,
    title: `Tailored - ${jobTitle} at ${job.company?.name || "Company"}`,
    fileInfo: {
      filename,
      originalName: filename,
      filePath,
      fileSize,
      mimeType: "application/pdf",
    },
    aiGenerated: {
      isTailored: true,
      tailoredForJobId: job._id,
      aiModel: "template-matcher-v1",
      generatedAt: new Date(),
    },
    extractedData: {
      skills: rankedSkills.map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean),
      keywords: jobKeywords.slice(0, 30),
      lastAnalyzed: new Date(),
    },
    isDefault: false,
  });

  await resume.save();
  logger.log(`[ResumeTailor] Tailored resume created for user ${user.email} for job ${job.title}`);

  return resume;
};

module.exports = { tailorResume };
