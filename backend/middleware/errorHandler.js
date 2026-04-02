// Global error handler middleware
const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ message: "Validation Error", errors: messages });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `Duplicate value for '${field}'` });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource ID" });
  }

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File size exceeds limit" });
  }

  // Multer or Cloudinary upload errors
  if (err.name === "MulterError") {
    return res
      .status(400)
      .json({ message: err.message || "File upload failed" });
  }

  if (
    /cloudinary|upload|invalid image file|resource_type|api_key|cloud_name/i.test(
      err.message || "",
    )
  ) {
    return res.status(500).json({
      message:
        "File upload service is not configured correctly. Please check server Cloudinary settings.",
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
