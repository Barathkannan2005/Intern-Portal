const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  postInternship,
  getMyInternships,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/companyController");

// All routes require company auth
router.use(protect, authorize("company"));

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/internship", postInternship);
router.get("/internships", getMyInternships);
router.get("/applicants/:internshipId", getApplicants);
router.put("/application/status", updateApplicationStatus);

module.exports = router;
