const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const sequelize = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/contacts", require("./routes/contactRouter"));
app.use("/api/auth", require("./routes/authRoutes")); // Auth routes

// Custom error handler (should always be last)
app.use(errorHandler);

// Sync Sequelize and start server
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // use { force: true } only for development
    console.log("✅ MySQL connection established and models synced.");
    console.log(`🚀 Server is running on port ${port}`);
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
});

// Optional greeting
console.log("hello from Anjali");
