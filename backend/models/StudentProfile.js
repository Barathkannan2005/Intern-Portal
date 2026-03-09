const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    department: {
      type: String,
      trim: true,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },
    skills: [{ type: String, trim: true }],
    projects: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        link: { type: String, trim: true },
      },
    ],
    academics: {
      university: { type: String, trim: true },
      degree: { type: String, trim: true },
      yearOfStudy: { type: Number },
      graduationYear: { type: Number },
    },
    resumeURL: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
