const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  company: {
    name: { type: String, required: true },
    logo: String,
    website: String,
    size: {
      type: String,
      enum: ['Startup', 'Small', 'Medium', 'Large', 'Enterprise']
    },
    industry: String
  },
  
  description: { 
    type: String, 
    required: true,
    maxlength: 10000
  },
  requirements: {
    type: String,
    maxlength: 5000
  },
  
  location: {
    city: String,
    state: String,
    country: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    isRemote: { type: Boolean, default: false },
    workArrangement: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      required: true
    }
  },
  
  jobType: { 
    type: String, 
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'],
    required: true
  },
  
  requiredSkills: [{
    name: { type: String, required: true },
    importance: { 
      type: String, 
      enum: ['Required', 'Preferred', 'Nice-to-have'],
      default: 'Required'
    },
    minYearsExperience: { type: Number, default: 0 }
  }],
  
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' },
    period: { 
      type: String, 
      enum: ['Hourly', 'Monthly', 'Yearly'],
      default: 'Yearly'
    }
  },
  
  benefits: [String],
  
  applicationMethod: {
    type: String,
    enum: ['Platform', 'External', 'Email'],
    default: 'Platform'
  },
  externalApplicationUrl: String,
  applicationEmail: String,
  
  postedDate: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  applicationDeadline: Date,
  
  source: {
    platform: { type: String, required: true },
    originalUrl: String,
    scrapedAt: Date
  },
  
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  applicationCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
JobSchema.index({ title: 'text', 'company.name': 'text', description: 'text' });
JobSchema.index({ 'location.city': 1, 'location.state': 1 });
JobSchema.index({ jobType: 1, experienceLevel: 1 });
JobSchema.index({ 'requiredSkills.name': 1 });
JobSchema.index({ postedDate: -1 });

JobSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Job', JobSchema);
