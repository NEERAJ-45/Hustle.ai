const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profile: {
    phone: String,
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    bio: {
      type: String,
      maxlength: 1000,
    },
    skills: [
      {
        name: { type: String, required: true },
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Intermediate",
        },
        yearsOfExperience: { type: Number, min: 0 },
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        isCurrent: { type: Boolean, default: false },
        description: String,
        achievements: [String],
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
        gpa: Number,
      },
    ],
    certifications: [
      {
        name: String,
        issuingOrganization: String,
        issueDate: Date,
        expiryDate: Date,
        credentialId: String,
      },
    ],
  },
  preferences: {
    jobTypes: [
      {
        type: String,
        enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"],
      },
    ],
    workArrangements: [
      {
        type: String,
        enum: ["Remote", "Hybrid", "On-site"],
      },
    ],
    desiredLocations: [
      {
        city: String,
        state: String,
        country: String,
        radius: { type: Number, default: 25 },
      },
    ],
    salaryRange: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
      currency: { type: String, default: "USD" },
    },
    industries: [String],
    companySize: [
      {
        type: String,
        enum: ["Startup", "Small", "Medium", "Large", "Enterprise"],
      },
    ],
  },
  settings: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    autoApplyEnabled: { type: Boolean, default: false },
    profileVisibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Private",
    },
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
// Removed this line to fix duplicate index warning
// UserSchema.index({ email: 1 });
UserSchema.index({ "profile.skills.name": 1 });
UserSchema.index({ "profile.location.city": 1, "profile.location.state": 1 });

// Middleware to update updatedAt on save
UserSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  // Only hash the password if it is new or modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Helper method to compare plain password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Customize toJSON to exclude password from output
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
