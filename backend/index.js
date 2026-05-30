// ─────────────────────────────────────────────────────────────────────────────
// index.js — Server Entry Point
//
// This is the first file Node.js runs. It:
//   1. Loads environment variables from .env.local
//   2. Connects to MongoDB
//   3. Starts the HTTP server on the configured port
//
// We keep server startup logic here (not in app.js) so that app.js
// can be imported in tests without accidentally starting a server.
// ─────────────────────────────────────────────────────────────────────────────

// Load .env.local FIRST — all other modules that use process.env depend on this
require("dotenv").config({ path: ".env.local" });

const app = require("./app");           // Express app configuration
const connectDB = require("./config/db"); // MongoDB connection function

// Read PORT from environment, fallback to 5000 if not set
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Only listen on a port if not running in serverless production (Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app so Vercel can mount it as a serverless function handler
module.exports = app;