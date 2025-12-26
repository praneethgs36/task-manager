const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

/**
 * GET all tasks for logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    console.error("TASK FETCH ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/**
 * CREATE a task
 */
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error("TASK CREATE ERROR:", err.message);
    res.status(500).json({ message: "Failed to create task" });
  }
});

/**
 * UPDATE a task
 */
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title: req.body.title, completed: req.body.completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("TASK UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Failed to update task" });
  }
});

/**
 * DELETE a task
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("TASK DELETE ERROR:", err.message);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
