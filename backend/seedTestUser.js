const mongoose = require("mongoose");
const User = require("./src/models/user.model");
require("dotenv").config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/hustle_ai");
    console.log("Connected to MongoDB");

    const userId = "507f1f77bcf86cd799439011";
    
    // Check if user already exists
    let user = await User.findById(userId);
    if (!user) {
      user = new User({
        _id: userId,
        name: "Auto Apply Test User",
        email: "test.autoapply@example.com",
        password: "password123", // Will be hashed by pre-save hooks
        role: "user"
      });
      await user.save();
      console.log("Mock User Seeded Successfully!");
    } else {
      console.log("Mock User already exists, proceeding.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding mock user:", error);
    process.exit(1);
  }
}

seedUser();
