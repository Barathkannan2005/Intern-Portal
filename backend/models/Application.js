const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "selected", "rejected"],
      default: "applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate applications
applicationSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
