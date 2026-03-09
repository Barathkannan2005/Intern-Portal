const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Reusable Cloudinary storage factory
const createCloudinaryStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `internship-portal/${folder}`,
      allowed_formats: ["pdf", "jpg", "jpeg", "png", "doc", "docx"],
      resource_type: "auto",
    },
  });
};

// Upload middleware for resumes
const uploadResume = multer({
  storage: createCloudinaryStorage("resumes"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload middleware for internship reports
const uploadReport = multer({
  storage: createCloudinaryStorage("reports"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Upload middleware for certificates
const uploadCertificate = multer({
  storage: createCloudinaryStorage("certificates"),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Generic upload middleware
const uploadFile = multer({
  storage: createCloudinaryStorage("general"),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = {
  uploadResume,
  uploadReport,
  uploadCertificate,
  uploadFile,
};
