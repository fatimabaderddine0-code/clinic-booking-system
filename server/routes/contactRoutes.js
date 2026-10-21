const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages
} = require("../controllers/contactController");

const verifyAdmin = require("../middleware/authMiddleware");

// Public: visitors can send messages
router.post("/", createMessage);

// Protected: only admin can view messages
router.get("/", verifyAdmin, getMessages);

module.exports = router;