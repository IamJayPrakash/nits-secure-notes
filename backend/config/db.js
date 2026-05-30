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

let cachedConnection = null;

/**
 * Connects to MongoDB using the URI from environment variables.
 * Caches the connection in serverless environments to prevent connection limits.
 */
const connectDB = async () => {
  // If we already have a connection, reuse it
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB using cached connection");
    return;
  }

  // If connection is in progress, await it
  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection is already connecting...");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Disable buffering for serverless to fail fast if disconnected
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Do not call process.exit(1) in serverless environments — throw instead so Express handles it
    throw error;
  }
};

module.exports = connectDB;