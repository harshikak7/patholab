const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");

const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Technician = require("../models/technicianModel");
const transporter = require("../config/mail");

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

router.get("/bookings", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const bookings = await Booking.find()
      .sort({ appointmentDate: -1 })
      .populate("userId", "name email phone")
  .populate("tests", "testName")
  .populate("technicianId", "name phone");

    const todayBookings = bookings.filter(
      (b) =>
        new Date(b.appointmentDate).toDateString() === today.toDateString(),
    ).length;

    const pendingAssignments = bookings.filter(
      (b) => b.status === "Pending",
    ).length;

    const pendingReports = bookings.filter((b) => !b.reportUpload).length;

    res.json({
      stats: {
        todayBookings,
        pendingAssignments,
        pendingReports,
      },
      bookings,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
});

router.get(
  "/technicians",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const technicians = await Technician.find().sort({ name: 1 });

      res.json(technicians);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Failed to fetch technicians",
      });
    }
  }
);

router.put(
  "/bookings/:id/assign",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      const { technicianId } = req.body;
      const technician = await Technician.findById(technicianId);

     const booking = await Booking.findById(req.params.id)
  .populate("userId", "name email")
  .populate("tests", "testName");

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      booking.technicianId = technicianId;
      booking.status = "Assigned";

      await booking.save({
        validateBeforeSave: false,
      });
await transporter.sendMail({
  from: `"PathoLab" <${process.env.EMAIL_USER}>`,
  to: booking.userId.email,
  subject: "Technician Assigned for Your Booking",

  html: `
  <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">

    <div style="background:#2563eb;padding:22px;color:white;text-align:center">
      <h2 style="margin:0">PathoLab</h2>
      <p style="margin-top:8px">
        Technician Assigned Successfully
      </p>
    </div>

    <div style="padding:30px">

      <p>Hello <b>${booking.userId.name}</b>,</p>

      <p>
        Your home sample collection appointment has been confirmed.
        A technician has been assigned to visit you.
      </p>

      <table style="width:100%;margin-top:20px;border-collapse:collapse">

        <tr>
          <td style="padding:8px"><b>Technician</b></td>
          <td>${technician.name}</td>
        </tr>

        <tr>
          <td style="padding:8px"><b>Phone</b></td>
          <td>${technician.phone}</td>
        </tr>

        <tr>
          <td style="padding:8px"><b>Date</b></td>
          <td>${new Date(
            booking.appointmentDate
          ).toLocaleDateString("en-GB")}</td>
        </tr>

        <tr>
          <td style="padding:8px"><b>Time</b></td>
          <td>${booking.timeSlot}</td>
        </tr>

        <tr>
          <td style="padding:8px"><b>Tests</b></td>
          <td>${booking.tests
            .map((t) => t.testName)
            .join(", ")}</td>
        </tr>

      </table>

      <p style="margin-top:30px">
        Please keep a valid ID ready during sample collection.
      </p>

      <p>
        Thank you for choosing <b>PathoLab</b>.
      </p>

    </div>

  </div>
  `,
});
      const updatedBooking = await Booking.findById(booking._id)
        .populate("technicianId", "name phone");

      res.json(updatedBooking);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Failed to assign technician",
      });
    }
  }
);

module.exports = router;
