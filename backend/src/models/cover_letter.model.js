const mongoose = require('mongoose');

const CoverLetterSchema = new mongoose.Schema({
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
  
  content: { 
    type: String, 
    required: true,
    maxlength: 5000
  },
  
  aiGeneration: {
    isAIGenerated: { type: Boolean, default: true },
    aiModel: String,
    promptUsed: String,
    generatedAt: { type: Date, default: Date.now },
    userEdited: { type: Boolean, default: false },
    editHistory: [{
      editedAt: Date,
      changes: String
    }]
  },
  
  template: {
    templateId: String,
    templateName: String,
    customizations: mongoose.Schema.Types.Mixed
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
CoverLetterSchema.index({ userId: 1, jobId: 1 });
CoverLetterSchema.index({ jobId: 1 });

CoverLetterSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('CoverLetter', CoverLetterSchema);
