const express = require("express");

const auth = require("../middleware/auth");

const { validateTask } = require("../middleware/validate");

const Task = require("../models/Task");

const logAction = require("../utils/logger");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/
router.post("/", auth, validateTask, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      owner: req.user.id,
    });

    logAction(`Task created by user ${req.user.id}`);

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Get My Tasks
|--------------------------------------------------------------------------
*/
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load tasks",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/
router.put("/:id", auth, validateTask, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = req.body.title;

    await task.save();

    logAction(`Task updated by user ${req.user.id}`);

    return res.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    logAction(`Task deleted by user ${req.user.id}`);

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
});

module.exports = router;
