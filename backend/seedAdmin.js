require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");

    const existing = await User.findOne({ email: "admin@internportal.com" });
    if (existing) {
      console.log("Admin user already exists:");
      console.log("  Email: admin@internportal.com");
      console.log("  Role:", existing.role);
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@internportal.com",
      password: "Admin@123",
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("  Email: admin@internportal.com");
    console.log("  Password: Admin@123");
    console.log("  Role:", admin.role);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
