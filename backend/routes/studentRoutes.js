const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  uploadResume: uploadResumeMiddleware,
  uploadReport: uploadReportMiddleware,
  uploadCertificate: uploadCertMiddleware,
} = require("../middleware/upload");
const {
  getProfile,
  updateProfile,
  uploadResume,
  getInternships,
  applyForInternship,
  getApplications,
  uploadReport,
  uploadCertificate,
  getRecommendations,
} = require("../controllers/studentController");

// All routes require student auth
router.use(protect, authorize("student"));

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/resume", uploadResumeMiddleware.single("resume"), uploadResume);
router.get("/internships", getInternships);
router.post("/apply/:internshipId", applyForInternship);
router.get("/applications", getApplications);
router.post("/report", uploadReportMiddleware.single("report"), uploadReport);
router.post(
  "/certificate",
  uploadCertMiddleware.single("certificate"),
  uploadCertificate,
);
router.get("/recommendations", getRecommendations);

module.exports = router;
