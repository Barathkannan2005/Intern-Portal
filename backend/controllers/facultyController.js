const Application = require("../models/Application");
const Report = require("../models/Report");
const User = require("../models/User");

// @desc    Get all students with their internship progress
// @route   GET /api/faculty/students
exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" }).select("name email");

    // Get application counts for each student
    const studentsWithProgress = await Promise.all(
      students.map(async (student) => {
        const applications = await Application.countDocuments({
          studentId: student._id,
        });
        const selected = await Application.countDocuments({
          studentId: student._id,
          status: "selected",
        });
        return {
          ...student.toObject(),
          totalApplications: applications,
          selectedCount: selected,
        };
      }),
    );

    res.json({ students: studentsWithProgress });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student internship progress detail
// @route   GET /api/faculty/student/:studentId/progress
exports.getStudentProgress = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const applications = await Application.find({ studentId })
      .populate({
        path: "internshipId",
        populate: { path: "companyId", select: "companyName" },
      })
      .sort({ appliedDate: -1 });

    const reports = await Report.find({ studentId })
      .populate("internshipId", "role")
      .sort({ createdAt: -1 });

    res.json({ applications, reports });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pending reports for review
// @route   GET /api/faculty/reports
exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate("studentId", "name email")
      .populate({
        path: "internshipId",
        populate: { path: "companyId", select: "companyName" },
      })
      .sort({ createdAt: -1 });

    res.json({ reports });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve internship report and assign credit
// @route   PUT /api/faculty/report/:reportId/approve
exports.approveReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { academicCredit, feedback } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      {
        approvedByFaculty: true,
        facultyId: req.user._id,
        academicCredit: academicCredit || 0,
        feedback,
      },
      { new: true },
    )
      .populate("studentId", "name email")
      .populate("internshipId", "role");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ report });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject / request revision for a report
// @route   PUT /api/faculty/report/:reportId/reject
exports.rejectReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { feedback } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      {
        approvedByFaculty: false,
        facultyId: req.user._id,
        feedback,
      },
      { new: true },
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ report });
  } catch (error) {
    next(error);
  }
};
