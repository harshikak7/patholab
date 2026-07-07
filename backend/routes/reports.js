const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");

const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

const Booking = require("../models/bookingModel");
const Report = require("../models/reportModel");
const transporter = require("../config/mail");

router.post(
  "/upload",
  verifyToken,
  verifyRole("admin"),
  upload.single("report"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const booking = await Booking.findById(req.body.bookingId)
        .populate("userId", "name email")
        .populate("tests", "testName");

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "patholab-reports",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(req.file.buffer);
      });
      console.log(uploadResult);
      //  here above
      let report = await Report.findOne({
        bookingId: booking._id,
      });

      if (report) {
        report.reportUrl = uploadResult.secure_url;
        await report.save();
      } else {
        report = await Report.create({
          bookingId: booking._id,
          userId: booking.userId,
          reportUrl: uploadResult.secure_url,
        });
      }

      await Booking.findByIdAndUpdate(
        booking._id,
        {
          reportUpload: true,
        },
        {
          runValidators: false,
        },
      );
      await transporter.sendMail({
        from: `"PathoLab" <${process.env.EMAIL_USER}>`,
        to: booking.userId.email,
        subject: "Your Pathology Report is Ready",

        html: `
  <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">

    <div style="background:#2563eb;padding:22px;text-align:center;color:white">
      <h2 style="margin:0;">PathoLab</h2>
      <p style="margin-top:8px;">
        Your Report is Ready
      </p>
    </div>

    <div style="padding:30px;">

      <p>Hello <b>${booking.userId.name}</b>,</p>

      <p>
        Great news! Your pathology report has been uploaded and is now available.
      </p>

      <table style="width:100%;margin-top:20px;border-collapse:collapse;">

        <tr>
          <td style="padding:8px;"><b>Tests</b></td>
          <td>${booking.tests.map((t) => t.testName).join(", ")}</td>
        </tr>

        <tr>
          <td style="padding:8px;"><b>Appointment Date</b></td>
          <td>${new Date(booking.appointmentDate).toLocaleDateString(
            "en-GB",
          )}</td>
        </tr>

      </table>

      <div style="text-align:center;margin-top:35px;">

        <a
          href="${report.reportUrl}"
          target="_blank"
          style="
            background:#2563eb;
            color:white;
            padding:14px 26px;
            border-radius:8px;
            text-decoration:none;
            font-weight:bold;
            display:inline-block;
          "
        >
          View Report
        </a>

      </div>

      <p style="margin-top:35px;">
        You can also access this report anytime from your PathoLab account.
      </p>

      <p>
        Thank you for choosing <b>PathoLab</b>.
      </p>

    </div>

  </div>
  `,
      });

      res.status(201).json({
        message: "Report uploaded successfully",
        report,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Report upload failed",
      });
    }
  },
);

/* ===========================
   Admin Reports
=========================== */

router.get("/admin", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const reports = await Report.find()
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "userId",
            select: "name email phone",
          },
          {
            path: "tests",
            select: "testName",
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
});

/* ===========================
   User Reports
=========================== */

router.get("/my-reports", verifyToken, async (req, res) => {
  try {
    const reports = await Report.find({
      userId: req.user.id,
    }).populate({
      path: "bookingId",
      populate: {
        path: "tests",
        select: "testName",
      },
    });

    res.json(reports);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
});

router.get("/:bookingId", verifyToken, async (req, res) => {
  try {
    const report = await Report.findOne({
      bookingId: req.params.bookingId,
    });

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json(report);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch report",
    });
  }
});

module.exports = router;
