const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");

const Booking = require("../models/bookingModel");

router.get(
  "/bookings",
  verifyToken,
  verifyRole("admin"),

  async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("userId", "name email phone")
        .populate("tests", "testName price");

      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message: "Failed",
      });
    }
  },
);

module.exports = router;
