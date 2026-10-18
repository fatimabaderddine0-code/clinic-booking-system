
const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 1. Check required fields
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  // 2. Find admin by email
  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    // 3. Check if admin exists
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const admin = results[0];

    // 4. Compare password with stored hash
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          message: "Password verification error"
        });
      }

      // 5. Check password result
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
  { id: admin.id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

return res.status(200).json({
  message: "Login successful",
  token: token
});
    });
  });
});
router.get("/profile", verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin!",
    adminId: req.admin.id
  });
});
module.exports = router;
