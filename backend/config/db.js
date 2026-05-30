// ─────────────────────────────────────────────────────────────────────────────
// config/db.js — MongoDB Connection
//
// This module exports a single function that connects to MongoDB.
// It is called once in index.js at server startup.
//
// Why separate file?
//   Centralises DB config — if you switch to a different DB later,
//   you only change this one file.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the URI from environment variables.
 * If connection fails, the process exits so the server doesn't run without a DB.
 */
const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise — we await it to know if it succeeded
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit with code 1 (failure) — prevents the app from running without a DB
    process.exit(1);
  }
};

module.exports = connectDB;