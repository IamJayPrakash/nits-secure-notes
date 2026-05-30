// ─────────────────────────────────────────────────────────────────────────────
// models/Notes.js — Note Mongoose Schema
//
// Defines the shape of a note document in the "notes" MongoDB collection.
// Each note belongs to exactly one user (via userId).
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    // Short heading for the note
    title: {
      type: String,
      required: true,
      trim: true,   // strip leading/trailing whitespace
    },

    // Main body of the note
    description: {
      type: String,
      required: true,
    },

    // Reference to the User who owns this note.
    // ObjectId is MongoDB's unique ID type.
    // ref: "User" enables Mongoose .populate() to fetch the user object if needed.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Automatically adds createdAt (when created) and updatedAt (when last edited)
    timestamps: true,
  }
);

// "Note" → Mongoose pluralises this to the "notes" collection in MongoDB
module.exports = mongoose.model("Note", noteSchema);