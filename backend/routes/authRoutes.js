const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { validateRegister, validateLogin } = require("../middleware/validate");

const { encrypt } = require("../utils/encryption");

const logAction = require("../utils/logger");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
router.post("/register", validateRegister, async (req, res) => {
  try {
    const { username, email, password, securityNote } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const encryptedNote = securityNote ? encrypt(securityNote) : "";

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      securityNote: encryptedNote,
    });

    logAction(`User registered: ${user.email}`);

    return res.status(201).json({
      success: true,
      message: "Registration completed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie(process.env.COOKIE_NAME, token, cookieOptions);
    console.log("Cookie sent");

    logAction(`User login: ${user.email}`);
    console.log(res.getHeaders());
    return res.json({
      success: true,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
router.post("/logout", (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
