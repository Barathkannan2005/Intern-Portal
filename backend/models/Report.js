const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
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
    reportURL: {
      type: String,
      required: [true, "Report file URL is required"],
    },
    certificateURL: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      trim: true,
    },
    approvedByFaculty: {
      type: Boolean,
      default: false,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    academicCredit: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Report", reportSchema);
