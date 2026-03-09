const User = require("../models/User");
const Company = require("../models/Company");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const Report = require("../models/Report");

// @desc    Get all students
// @route   GET /api/admin/students
exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json({ students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all companies
// @route   GET /api/admin/companies
exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().populate("userId", "name email");
    res.json({ companies });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify / unverify an internship posting
// @route   PUT /api/admin/internship/:internshipId/verify
exports.verifyInternship = async (req, res, next) => {
  try {
    const { internshipId } = req.params;
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    internship.isVerified = !internship.isVerified;
    await internship.save();

    res.json({ internship });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all internships (including unverified)
// @route   GET /api/admin/internships
exports.getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find()
      .populate("companyId", "companyName")
      .sort({ postedDate: -1 });
    res.json({ internships });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/user/:userId
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics dashboard data
// @route   GET /api/admin/analytics
exports.getAnalytics = async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalCompanies,
      totalInternships,
      totalApplications,
      activeInternships,
      verifiedInternships,
      totalReports,
      approvedReports,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Company.countDocuments(),
      Internship.countDocuments(),
      Application.countDocuments(),
      Internship.countDocuments({ isActive: true }),
      Internship.countDocuments({ isVerified: true }),
      Report.countDocuments(),
      Report.countDocuments({ approvedByFaculty: true }),
    ]);

    // Application status distribution
    const statusDistribution = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Recent applications (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentApplications = await Application.countDocuments({
      appliedDate: { $gte: thirtyDaysAgo },
    });

    res.json({
      totalStudents,
      totalCompanies,
      totalInternships,
      totalApplications,
      activeInternships,
      verifiedInternships,
      totalReports,
      approvedReports,
      statusDistribution,
      recentApplications,
    });
  } catch (error) {
    next(error);
  }
};
