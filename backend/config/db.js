// ─────────────────────────────────────────────────────────────────────────────
// config/db.js — MongoDB Connection
//
// This module exports a single function that connects to MongoDB.
// Caches the connection in serverless environments to prevent connection limits.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless container reuse.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Register global connection error listener once to prevent uncaught exceptions/unhandled rejections
if (!global.mongooseRegistered) {
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error event:", err.message);
  });
  global.mongooseRegistered = true;
}

/**
 * Connects to MongoDB using the URI from environment variables.
 * Caches the connection in serverless environments to prevent connection limits.
 */
const connectDB = async () => {
  // If we already have a connection, reuse it
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cached.conn) {
    return cached.conn;
  }

  // If there's no connection in progress, start one
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    const opts = {
      bufferCommands: false, // Disable buffering for serverless to fail fast
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB Connected");
      return mongooseInstance;
    });
  } else {
    console.log("MongoDB connection promise already in progress, awaiting...");
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Reset the cached promise/connection on failure so subsequent requests can try again
    cached.promise = null;
    cached.conn = null;
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;