const express = require("express");
const router = express.Router();

const {
  getAbout,
  updateAbout
} = require("../controllers/aboutController");

const verifyAdmin = require("../middleware/authMiddleware");

// Public: anyone can view About
router.get("/", getAbout);

// Protected: only admin can update About
router.put("/", verifyAdmin, updateAbout);

module.exports = router;