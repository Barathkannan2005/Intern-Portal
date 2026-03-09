const StudentProfile = require("../models/StudentProfile");
const Application = require("../models/Application");
const Internship = require("../models/Internship");
const Report = require("../models/Report");

// @desc    Get or create student profile
// @route   GET /api/student/profile
exports.getProfile = async (req, res, next) => {
  try {
    let profile = await StudentProfile.findOne({
      userId: req.user._id,
    }).populate("userId", "name email");

    if (!profile) {
      profile = await StudentProfile.create({ userId: req.user._id });
      profile = await StudentProfile.findById(profile._id).populate(
        "userId",
        "name email",
      );
    }

    res.json({ profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { department, cgpa, skills, projects, academics } = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { department, cgpa, skills, projects, academics },
      { new: true, runValidators: true },
    ).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload resume
// @route   POST /api/student/resume
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { resumeURL: req.file.path },
      { new: true },
    );

    res.json({ resumeURL: profile.resumeURL });
  } catch (error) {
    next(error);
  }
};

// @desc    Browse internship listings
// @route   GET /api/internships
exports.getInternships = async (req, res, next) => {
  try {
    const { search, location, skills, page = 1, limit = 10 } = req.query;

    const query = { isActive: true, isVerified: true };

    if (search) {
      query.$or = [
        { role: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (skills) {
      const skillArray = skills.split(",").map((s) => s.trim());
      query.requiredSkills = { $in: skillArray };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const total = await Internship.countDocuments(query);

    const internships = await Internship.find(query)
      .populate(
        "companyId",
        "companyName logo location description website industry",
      )
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      internships,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply for an internship
// @route   POST /api/student/apply/:internshipId
exports.applyForInternship = async (req, res, next) => {
  try {
    const { internshipId } = req.params;
    const { coverLetter } = req.body;

    // Check if student profile is complete (skills + resume required)
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (
      !profile ||
      !profile.skills ||
      profile.skills.length === 0 ||
      !profile.resumeURL
    ) {
      return res.status(400).json({
        message:
          "Please complete your profile with skills and resume before applying",
      });
    }

    // Check if internship exists and is active
    const internship = await Internship.findById(internshipId);
    if (!internship || !internship.isActive) {
      return res
        .status(404)
        .json({ message: "Internship not found or inactive" });
    }

    // Check for duplicate application
    const existingApp = await Application.findOne({
      studentId: req.user._id,
      internshipId,
    });
    if (existingApp) {
      return res
        .status(400)
        .json({ message: "Already applied to this internship" });
    }

    const application = await Application.create({
      studentId: req.user._id,
      internshipId,
      coverLetter,
    });

    res.status(201).json({ application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student's applications
// @route   GET /api/student/applications
exports.getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate({
        path: "internshipId",
        populate: {
          path: "companyId",
          select: "companyName logo location description website industry",
        },
      })
      .sort({ appliedDate: -1 });

    res.json({ applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload internship report
// @route   POST /api/student/report
exports.uploadReport = async (req, res, next) => {
  try {
    const { internshipId, summary } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a report file" });
    }

    const report = await Report.create({
      studentId: req.user._id,
      internshipId,
      reportURL: req.file.path,
      summary,
    });

    res.status(201).json({ report });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload internship certificate
// @route   POST /api/student/certificate
exports.uploadCertificate = async (req, res, next) => {
  try {
    const { reportId } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload a certificate file" });
    }

    const report = await Report.findOneAndUpdate(
      { _id: reportId, studentId: req.user._id },
      { certificateURL: req.file.path },
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

// @desc    Get recommended internships based on student skills
// @route   GET /api/student/recommendations
exports.getRecommendations = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (!profile || !profile.skills || profile.skills.length === 0) {
      // Return latest internships if no skills set
      const internships = await Internship.find({
        isActive: true,
        isVerified: true,
      })
        .populate("companyId", "companyName logo location")
        .sort({ postedDate: -1 })
        .limit(10);
      return res.json({ internships });
    }

    const internships = await Internship.find({
      isActive: true,
      isVerified: true,
      requiredSkills: { $in: profile.skills },
    })
      .populate("companyId", "companyName logo location")
      .sort({ postedDate: -1 })
      .limit(10);

    res.json({ internships });
  } catch (error) {
    next(error);
  }
};
