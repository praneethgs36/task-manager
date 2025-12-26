require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */

// Health check / root route (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.status(200).send("Task Manager API is running");
});

// Auth & task routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

/* -------------------- SERVER -------------------- */
// Render provides PORT automatically
const PORT = process.env.PORT || 5001;

// MUST bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
