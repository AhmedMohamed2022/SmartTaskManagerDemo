const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validator = require("validator");
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

    const normalizedEmail = validator.normalizeEmail(email?.trim());

    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

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
      email: normalizedEmail,
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

    const normalizedEmail = validator.normalizeEmail(email?.trim());

    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

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
    /*
|--------------------------------------------------------------------------
| CSRF Mitigation
|--------------------------------------------------------------------------
|
| Authentication cookies use:
| - HttpOnly
| - SameSite=Strict
| - Secure flag in production
|
| Production deployment should additionally
| use dedicated CSRF middleware such as csurf.
|
*/
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie(process.env.COOKIE_NAME, token, cookieOptions);

    logAction(`User login: ${user.email}`);
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
