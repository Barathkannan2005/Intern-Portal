const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getStudents,
  getCompanies,
  verifyInternship,
  getInternships,
  deleteUser,
  getAnalytics,
} = require("../controllers/adminController");

// All routes require admin auth
router.use(protect, authorize("admin"));

router.get("/students", getStudents);
router.get("/companies", getCompanies);
router.get("/internships", getInternships);
router.put("/internship/:internshipId/verify", verifyInternship);
router.delete("/user/:userId", deleteUser);
router.get("/analytics", getAnalytics);

module.exports = router;
