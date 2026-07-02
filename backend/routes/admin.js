const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");

const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

router.get("/dashboard", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Cards
    const todayBookings = await Booking.countDocuments({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const pendingReports = await Booking.countDocuments({
      reportUpload: false,
    });

    const completedTests = await Booking.countDocuments({
      status: "Completed",
    });

    const totalPatients = await User.countDocuments({
      role: "user",
    });

    // Recent Bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email")
      .populate("tests", "testName");

    // Status Chart

    const pending = await Booking.countDocuments({
      status: "Pending",
    });

    const assigned = await Booking.countDocuments({
      status: "Assigned",
    });

    const collected = await Booking.countDocuments({
      status: "Collected",
    });

    const completed = await Booking.countDocuments({
      status: "Completed",
    });

    res.json({
      cards: {
        todayBookings,
        pendingReports,
        completedTests,
        totalPatients,
      },

      statusChart: [
        {
          name: "Pending",
          value: pending,
        },
        {
          name: "Assigned",
          value: assigned,
        },
        {
          name: "Collected",
          value: collected,
        },
        {
          name: "Completed",
          value: completed,
        },
      ],

      recentBookings,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Dashboard Failed",
    });
  }
});

module.exports = router;
