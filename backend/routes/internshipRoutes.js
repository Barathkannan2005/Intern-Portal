// Public route for browsing internships (no auth required)
const express = require("express");
const router = express.Router();
const { getInternships } = require("../controllers/studentController");

router.get("/", getInternships);

module.exports = router;
