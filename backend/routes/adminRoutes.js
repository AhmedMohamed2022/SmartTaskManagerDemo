const express = require("express");

const auth = require("../middleware/auth");

const User = require("../models/User");

const { decrypt } = require("../utils/encryption");

const logAction = require("../utils/logger");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Middleware
|--------------------------------------------------------------------------
*/
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
}

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const formattedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      securityNote: user.securityNote ? decrypt(user.securityNote) : "",
      role: user.role,
      createdAt: user.createdAt,
    }));

    logAction(`Admin ${req.user.id} viewed all users`);

    return res.json({
      success: true,
      users: formattedUsers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Promote User To Admin
|--------------------------------------------------------------------------
*/
router.put("/users/:id/promote", auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = "admin";

    await user.save();

    logAction(`Admin ${req.user.id} promoted user ${user._id}`);

    return res.json({
      success: true,
      message: "User promoted to admin",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to promote user",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/
router.delete("/users/:id", auth, adminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    logAction(`Admin ${req.user.id} deleted user ${req.params.id}`);

    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

module.exports = router;
