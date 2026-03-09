const Company = require("../models/Company");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

// @desc    Get company profile
// @route   GET /api/company/profile
exports.getProfile = async (req, res, next) => {
  try {
    let company = await Company.findOne({ userId: req.user._id }).populate(
      "userId",
      "name email",
    );

    if (!company) {
      company = await Company.create({
        userId: req.user._id,
        companyName: req.user.name,
      });
      company = await Company.findById(company._id).populate(
        "userId",
        "name email",
      );
    }

    res.json({ company });
  } catch (error) {
    next(error);
  }
};

// @desc    Update company profile
// @route   PUT /api/company/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { companyName, description, website, industry, location } = req.body;

    const company = await Company.findOneAndUpdate(
      { userId: req.user._id },
      { companyName, description, website, industry, location },
      { new: true, runValidators: true },
    ).populate("userId", "name email");

    if (!company) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.json({ company });
  } catch (error) {
    next(error);
  }
};

// @desc    Post a new internship
// @route   POST /api/company/internship
exports.postInternship = async (req, res, next) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company profile not found. Create it first." });
    }

    const {
      role,
      description,
      requiredSkills,
      stipend,
      duration,
      location,
      deadline,
    } = req.body;

    const internship = await Internship.create({
      companyId: company._id,
      role,
      description,
      requiredSkills,
      stipend,
      duration,
      location,
      deadline,
      isVerified: true,
    });

    res.status(201).json({ internship });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all internships posted by the company
// @route   GET /api/company/internships
exports.getMyInternships = async (req, res, next) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    const internships = await Internship.find({ companyId: company._id }).sort({
      postedDate: -1,
    });

    res.json({ internships });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applicants for an internship
// @route   GET /api/company/applicants/:internshipId
exports.getApplicants = async (req, res, next) => {
  try {
    const { internshipId } = req.params;

    // Verify the internship belongs to the company
    const company = await Company.findOne({ userId: req.user._id });
    const internship = await Internship.findOne({
      _id: internshipId,
      companyId: company._id,
    });

    if (!internship) {
      return res
        .status(404)
        .json({ message: "Internship not found or not authorized" });
    }

    const applications = await Application.find({ internshipId })
      .populate("studentId", "name email")
      .sort({ appliedDate: -1 });

    // Attach student profile (skills, resume) to each application
    const StudentProfile = require("../models/StudentProfile");
    const enriched = await Promise.all(
      applications.map(async (app) => {
        const appObj = app.toObject();
        const profile = await StudentProfile.findOne({
          userId: app.studentId._id,
        });
        appObj.studentProfile = profile
          ? {
              skills: profile.skills,
              resumeURL: profile.resumeURL,
              department: profile.department,
              cgpa: profile.cgpa,
              academics: profile.academics,
              projects: profile.projects,
            }
          : null;
        return appObj;
      }),
    );

    res.json({ applications: enriched });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (shortlist, accept, reject)
// @route   PUT /api/company/application/status
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId, status } = req.body;

    const validStatuses = [
      "applied",
      "shortlisted",
      "interview",
      "selected",
      "rejected",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Verify the application's internship belongs to this company
    const application =
      await Application.findById(applicationId).populate("internshipId");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const company = await Company.findOne({ userId: req.user._id });
    if (
      application.internshipId.companyId.toString() !== company._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json({ application });
  } catch (error) {
    next(error);
  }
};
