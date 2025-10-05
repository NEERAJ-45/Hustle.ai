const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
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
  
  resumeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Resume', 
    required: true 
  },
  coverLetterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CoverLetter' 
  },
  
  status: {
    current: { 
      type: String, 
      enum: [
        'Draft', 
        'Submitted', 
        'Under Review', 
        'Shortlisted', 
        'Interview Scheduled',
        'Interview Completed',
        'Offer Received',
        'Offer Accepted',
        'Offer Declined',
        'Rejected',
        'Withdrawn'
      ],
      default: 'Draft'
    },
    history: [{
      status: String,
      changedAt: { type: Date, default: Date.now },
      note: String,
      source: { 
        type: String, 
        enum: ['System', 'User', 'External'],
        default: 'System'
      }
    }],
    lastUpdated: { type: Date, default: Date.now }
  },
  
  automation: {
    isAutomated: { type: Boolean, default: false },
    automationEngine: String,
    submittedVia: {
      type: String,
      enum: ['Manual', 'API', 'WebScraping', 'Email'],
      default: 'Manual'
    },
    automationLogs: [{
      timestamp: Date,
      action: String,
      success: Boolean,
      errorMessage: String
    }]
  },
  
  interviews: [{
    type: { 
      type: String, 
      enum: ['Phone', 'Video', 'In-person', 'Technical', 'Panel'],
      required: true
    },
    scheduledAt: Date,
    duration: Number,
    interviewer: {
      name: String,
      title: String,
      email: String
    },
    location: String,
    meetingLink: String,
    status: { 
      type: String, 
      enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
      default: 'Scheduled'
    },
    feedback: String,
    notes: String
  }],
  
  communications: [{
    type: { 
      type: String, 
      enum: ['Email', 'Phone', 'Message', 'System'],
      required: true
    },
    direction: { 
      type: String, 
      enum: ['Incoming', 'Outgoing'],
      required: true
    },
    subject: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
    from: String,
    to: String
  }],
  
  notes: String,
  tags: [String],
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  
  appliedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound unique index to prevent duplicate applications
ApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
ApplicationSchema.index({ userId: 1, 'status.current': 1 });
ApplicationSchema.index({ jobId: 1 });
ApplicationSchema.index({ appliedAt: -1 });

ApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Application', ApplicationSchema);
