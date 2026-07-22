const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "uploads", "generated");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const generateResumePDF = (data) => {
  const { name, email, phone, location, skills, experience, education, summary, jobTitle } = data;
  const filename = `resume_${Date.now()}_${Math.round(Math.random() * 1e9)}.pdf`;
  const filePath = path.join(OUTPUT_DIR, filename);
  const doc = new PDFDocument({ margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const primary = "#1a365d";
  const accent = "#2b6cb0";
  const gray = "#718096";

  doc.fontSize(26).font("Helvetica-Bold").fillColor(primary).text(name || "Candidate", { align: "center" });
  if (jobTitle) {
    doc.fontSize(14).font("Helvetica").fillColor(accent).text(jobTitle, { align: "center" }).moveDown(0.3);
  }
  const contact = [email, phone, location].filter(Boolean).join("  |  ");
  if (contact) {
    doc.fontSize(10).fillColor(gray).text(contact, { align: "center" });
  }
  doc.moveDown(1);

  if (summary) {
    doc.fontSize(12).font("Helvetica-Bold").fillColor(primary).text("Professional Summary");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").fillColor("#2d3748").text(summary);
    doc.moveDown(0.8);
  }

  if (skills && skills.length > 0) {
    doc.fontSize(12).font("Helvetica-Bold").fillColor(primary).text("Skills");
    doc.moveDown(0.3);
    const skillLabels = skills.map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean);
    doc.fontSize(10).font("Helvetica").fillColor("#2d3748");
    let line = "";
    for (const s of skillLabels) {
      if (line.length + s.length > 80) {
        doc.text(line.trim() + ",");
        line = "";
      }
      line += (line ? ", " : "") + s;
    }
    if (line) doc.text(line.trim());
    doc.moveDown(0.8);
  }

  if (experience && experience.length > 0) {
    doc.fontSize(12).font("Helvetica-Bold").fillColor(primary).text("Experience");
    doc.moveDown(0.3);
    for (const exp of experience) {
      const title = [exp.title, exp.company].filter(Boolean).join(" — ");
      doc.fontSize(11).font("Helvetica-Bold").fillColor(primary).text(title);
      const dates = [exp.startDate, exp.endDate].filter(Boolean).join(" — ") || (exp.isCurrent ? "Present" : "");
      if (dates) {
        doc.fontSize(9).font("Helvetica-Oblique").fillColor(gray).text(dates, { align: "right" });
      }
      if (exp.description) {
        doc.fontSize(10).font("Helvetica").fillColor("#2d3748").text(exp.description);
      }
      if (exp.achievements && exp.achievements.length > 0) {
        for (const a of exp.achievements) {
          doc.fontSize(10).fillColor("#2d3748").text(`  • ${a}`);
        }
      }
      doc.moveDown(0.5);
    }
  }

  if (education && education.length > 0) {
    doc.fontSize(12).font("Helvetica-Bold").fillColor(primary).text("Education");
    doc.moveDown(0.3);
    for (const edu of education) {
      const degree = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(" in ");
      doc.fontSize(11).font("Helvetica-Bold").fillColor(primary).text(degree);
      doc.fontSize(10).font("Helvetica").fillColor("#2d3748").text(edu.institution || "");
      const years = [edu.startYear, edu.endYear].filter(Boolean).join(" — ");
      if (years) {
        doc.fontSize(9).font("Helvetica-Oblique").fillColor(gray).text(years);
      }
      doc.moveDown(0.4);
    }
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      const stats = fs.statSync(filePath);
      resolve({ filename, filePath, fileSize: stats.size });
    });
    stream.on("error", reject);
  });
};

const generateCoverLetterPDF = (data) => {
  const { userName, userEmail, companyName, jobTitle, content } = data;
  const filename = `cover_letter_${Date.now()}_${Math.round(Math.random() * 1e9)}.pdf`;
  const filePath = path.join(OUTPUT_DIR, filename);
  const doc = new PDFDocument({ margin: 60 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(22).font("Helvetica-Bold").fillColor("#1a365d").text("Cover Letter", { align: "center" });
  doc.moveDown(1.5);

  if (userName) {
    doc.fontSize(11).font("Helvetica").fillColor("#2d3748").text(userName);
  }
  if (userEmail) {
    doc.fontSize(10).fillColor("#718096").text(userEmail);
  }
  doc.moveDown(1);

  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.fontSize(10).fillColor("#718096").text(dateStr);
  doc.moveDown(1);

  if (companyName) {
    doc.fontSize(11).font("Helvetica").fillColor("#2d3748").text(`Dear Hiring Manager at ${companyName},`);
  } else {
    doc.fontSize(11).font("Helvetica").fillColor("#2d3748").text("Dear Hiring Manager,");
  }
  doc.moveDown(0.8);

  doc.fontSize(10).font("Helvetica").fillColor("#2d3748").text(content || "I am writing to express my interest in this position.");
  doc.moveDown(1.5);

  doc.fontSize(11).font("Helvetica").fillColor("#2d3748").text("Sincerely,");
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica-Bold").fillColor("#1a365d").text(userName || "Candidate");

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      const stats = fs.statSync(filePath);
      resolve({ filename, filePath, fileSize: stats.size });
    });
    stream.on("error", reject);
  });
};

module.exports = { generateResumePDF, generateCoverLetterPDF };
