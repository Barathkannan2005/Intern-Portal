const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getStudents,
  getStudentProgress,
  getReports,
  approveReport,
  rejectReport,
} = require("../controllers/facultyController");

// All routes require faculty auth
router.use(protect, authorize("faculty"));

router.get("/students", getStudents);
router.get("/student/:studentId/progress", getStudentProgress);
router.get("/reports", getReports);
router.put("/report/:reportId/approve", approveReport);
router.put("/report/:reportId/reject", rejectReport);

module.exports = router;
