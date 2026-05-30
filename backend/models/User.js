// ─────────────────────────────────────────────────────────────────────────────
// models/User.js — User Mongoose Schema
//
// A Mongoose schema defines the shape and rules of a document in MongoDB.
// Think of it like a table definition in SQL.
//
// This schema represents a registered user in the application.
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User's display name — required, whitespace stripped
    name: {
      type: String,
      required: true,
      trim: true,     // automatically removes leading/trailing spaces
    },

    // Email is the unique identifier for a user
    email: {
      type: String,
      required: true,
      unique: true,       // MongoDB creates a unique index on this field
      lowercase: true,    // always store email in lowercase (prevents duplicates like User@mail.com vs user@mail.com)
      trim: true,
    },

    // Store the HASHED password only — never store plain text passwords
    // The hashing is done in auth.service.js using bcryptjs before saving
    password: {
      type: String,
      required: true,
    },

    // Refresh token used to issue new access tokens when the old ones expire
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    // timestamps: true automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the model.
// "User" becomes the MongoDB collection name (Mongoose pluralises it to "users")
module.exports = mongoose.model("User", userSchema);