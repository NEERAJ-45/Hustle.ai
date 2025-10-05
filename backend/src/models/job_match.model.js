const mongoose = require('mongoose');

const JobMatchSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  
  matchScore: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  
  scoreBreakdown: {
    skillsMatch: {
      score: { type: Number, min: 0, max: 100 },
      matchedSkills: [String],
      missingSkills: [String]
    },
    experienceMatch: {
      score: { type: Number, min: 0, max: 100 },
      yearsMatch: Boolean,
      roleMatch: Boolean
    },
    locationMatch: {
      score: { type: Number, min: 0, max: 100 },
      distance: Number,
      preferenceMatch: Boolean
    },
    salaryMatch: {
      score: { type: Number, min: 0, max: 100 },
      withinRange: Boolean
    },
    preferenceMatch: {
      score: { type: Number, min: 0, max: 100 },
      jobTypeMatch: Boolean,
      industryMatch: Boolean
    }
  },
  
  aiAnalysis: {
    aiModel: { type: String, required: true },
    reasoning: String,
    recommendations: [String],
    confidenceLevel: { 
      type: String, 
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    analyzedAt: { type: Date, default: Date.now }
  },
  
  userFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    isInterested: Boolean,
    feedback: String,
    feedbackAt: Date
  },
  
  status: {
    type: String,
    enum: ['New', 'Viewed', 'Applied', 'Dismissed', 'Saved'],
    default: 'New'
  },
  
  isActive: { type: Boolean, default: true },
  expiresAt: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
JobMatchSchema.index({ userId: 1, matchScore: -1 });
JobMatchSchema.index({ userId: 1, status: 1 });
JobMatchSchema.index({ jobId: 1 });
JobMatchSchema.index({ expiresAt: 1 });

JobMatchSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('JobMatch', JobMatchSchema);
