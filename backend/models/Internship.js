const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    requiredSkills: [{ type: String, trim: true }],
    stipend: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Internship", internshipSchema);
