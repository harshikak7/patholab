const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const crypto = require("crypto");
const transporter = require("../config/mail");

//Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    res.status(201).json({ message: "Signup Successfull" });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({
      message: "Signup failed",
    });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, //24 hours x 60 mins x 60 seconds x 1000ms (how long cookie stays in browser since 1day so this no)
    });

    res.json({ message: "Login succesfull" });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

//Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out succesfully" });
});

//Check Auth Route
router.get("/check-auth", verifyToken, async (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

//forgot password
router.post("/forgot-Password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<h2>Reset Password</h2> <p>Click Below</p> <a href="${resetLink}">Reset Password</a>`,
    });
    res.status(200).json({ message: "Request email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

//reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const bcrypt = require("bcrypt");

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed" });
  }
});

//Google Login
router.post("/google-login", async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = new User({
        name,
        email,
        password: "GOOGLE",
        phone:'0000000000',
        address:'Google Login Address'
      });
      await user.save()
    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.cookie(
      "token",

      token,

      {
        httpOnly: true,
      },
    );

    res.status(200).json({
      message: "Login Success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed",
    });
  }
});

module.exports = router;

