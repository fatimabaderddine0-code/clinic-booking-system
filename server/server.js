
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./config/db");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fatimabaderddine0-code.github.io"
    ]
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("HealthCore Clinic server is running!");
});

// Database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connection successful!");
  }
});

// API routes
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HealthCore Clinic server running on port ${PORT}`);
});
