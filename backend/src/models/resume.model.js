const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  title: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  
  fileInfo: {
    filename: { type: String, required: true },
    originalName: String,
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, default: 'application/pdf' }
  },
  
  aiGenerated: {
    isTailored: { type: Boolean, default: false },
    baseResumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    tailoredForJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    aiModel: String,
    promptUsed: String,
    generatedAt: Date
  },
  
  extractedData: {
    skills: [String],
    experience: [{
      title: String,
      company: String,
      duration: String
    }],
    education: [String],
    keywords: [String],
    lastAnalyzed: Date
  },
  
  stats: {
    timesUsed: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    lastUsed: Date
  },
  
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  version: { type: Number, default: 1 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
ResumeSchema.index({ userId: 1 });
ResumeSchema.index({ userId: 1, isDefault: 1 });
ResumeSchema.index({ 'aiGenerated.tailoredForJobId': 1 });

ResumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Resume', ResumeSchema);
