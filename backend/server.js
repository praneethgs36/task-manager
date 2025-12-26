require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors({
  origin: "*", // later you can restrict to Vercel domain
}));
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server working" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// MongoDB connection (THIS IS THE KEY PART)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
