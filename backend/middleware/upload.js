const multer = require("multer");

const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Reusable local storage factory
const createLocalStorage = (folder) => {
  const folderPath = path.join(uploadsDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
};

// Upload middleware for resumes
const uploadResume = multer({
  storage: createLocalStorage("resumes"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload middleware for internship reports
const uploadReport = multer({
  storage: createLocalStorage("reports"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Upload middleware for certificates
const uploadCertificate = multer({
  storage: createLocalStorage("certificates"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Generic upload middleware
const uploadFile = multer({
  storage: createLocalStorage("general"),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = {
  uploadResume,
  uploadReport,
  uploadCertificate,
  uploadFile,
};
