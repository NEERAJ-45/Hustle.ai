const User = require("../models/user.model");
const Job = require("../models/job.model");
const CoverLetter = require("../models/cover_letter.model");
const { generateCoverLetterPDF } = require("./pdfGenerator");
const logger = require("../utils/logger");

const generateCoverLetter = async (userId, jobId) => {
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
  const companyName = job.company?.name || "your company";
  const jobTitle = job.title || "the position";
  const skillNames = (job.requiredSkills || []).map((s) => s.name).filter(Boolean);
  const userSkillNames = (profile.skills || []).map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean);
  const matchedSkills = skillNames.filter((s) => userSkillNames.some((us) => us.toLowerCase() === s.toLowerCase()));
  const matchedSkillText = matchedSkills.length > 0 ? `My expertise in ${matchedSkills.slice(0, 4).join(", ")} aligns closely with what you are looking for. ` : "";
  const experienceText = (profile.experience || []).length > 0 ? `I bring ${profile.experience.length} years of progressive experience, most recently ${profile.experience[0]?.title ? "as a " + profile.experience[0].title : ""}${profile.experience[0]?.company ? " at " + profile.experience[0].company : ""}. ` : "";

  const paragraphs = [
    `I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background and skills, I am confident I would be a valuable addition to your team.`,
    `${experienceText}${matchedSkillText}I am excited about the opportunity to contribute to ${companyName}'s success and grow professionally in a dynamic environment.`,
    `Thank you for considering my application. I look forward to the possibility of discussing how my experience and skills align with the needs of your team.`,
  ];

  const content = paragraphs.join("\n\n");

  const pdfData = {
    userName: user.name || "",
    userEmail: user.email || "",
    companyName,
    jobTitle,
    content,
  };

  const { filename, filePath } = await generateCoverLetterPDF(pdfData);

  const coverLetter = new CoverLetter({
    userId: user._id,
    jobId: job._id,
    content,
    aiGeneration: {
      isAIGenerated: true,
      aiModel: "template-generator-v1",
      generatedAt: new Date(),
      userEdited: false,
    },
    template: {
      templateId: "standard-cover-letter",
      templateName: "Standard Cover Letter",
    },
  });

  await coverLetter.save();
  logger.log(`[CoverLetterGen] Cover letter generated for user ${user.email} for job ${job.title}`);

  return { coverLetter, filePath, filename };
};

module.exports = { generateCoverLetter };
