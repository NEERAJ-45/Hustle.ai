const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Invalid email format'
    }
  },
  passwordHash: { 
    type: String, 
    required: true,
    minlength: 60
  },
  
  profile: {
    phone: String,
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    bio: {
      type: String,
      maxlength: 1000
    },
    skills: [{
      name: { type: String, required: true },
      proficiency: { 
        type: String, 
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Intermediate'
      },
      yearsOfExperience: { type: Number, min: 0 }
    }],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      isCurrent: { type: Boolean, default: false },
      description: String,
      achievements: [String]
    }],
    education: [{
      degree: String,
      institution: String,
      fieldOfStudy: String,
      startYear: Number,
      endYear: Number,
      gpa: Number
    }],
    certifications: [{
      name: String,
      issuingOrganization: String,
      issueDate: Date,
      expiryDate: Date,
      credentialId: String
    }]
  },
  
  preferences: {
    jobTypes: [{ 
      type: String, 
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship'] 
    }],
    workArrangements: [{
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site']
    }],
    desiredLocations: [{
      city: String,
      state: String,
      country: String,
      radius: { type: Number, default: 25 }
    }],
    salaryRange: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
      currency: { type: String, default: 'USD' }
    },
    industries: [String],
    companySize: [{
      type: String,
      enum: ['Startup', 'Small', 'Medium', 'Large', 'Enterprise']
    }]
  },
  
  settings: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    autoApplyEnabled: { type: Boolean, default: false },
    profileVisibility: { 
      type: String, 
      enum: ['Public', 'Private'], 
      default: 'Private' 
    }
  },
  
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ 'profile.skills.name': 1 });
UserSchema.index({ 'profile.location.city': 1, 'profile.location.state': 1 });

// Middleware to update updatedAt on save
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', UserSchema);
