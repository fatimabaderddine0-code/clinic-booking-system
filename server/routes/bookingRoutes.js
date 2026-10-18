const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/authMiddleware");
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/",verifyAdmin, bookingController.getAllBookings);
router.get("/:id",verifyAdmin,bookingController.getBookingById);
router.put("/:id",verifyAdmin,bookingController.updateBooking);
router.delete("/:id",verifyAdmin,bookingController.deleteBooking);
module.exports = router;