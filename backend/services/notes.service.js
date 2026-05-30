const Note = require("../models/Notes");

/**
 * Get all notes for a user with optional sorting.
 * @param {string} userId
 * @param {{ sortBy?: string, order?: string }} options
 */
const getNotes = async (userId, { sortBy = "createdAt", order = "desc" } = {}) => {
  const filter = { userId };

  const sortOrder = order === "asc" ? 1 : -1;
  const allowedSortFields = ["createdAt", "updatedAt"];
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  return Note.find(filter).sort({ [safeSortBy]: sortOrder });
};

const getSingleNote = async (id, userId) => {
  const note = await Note.findOne({ _id: id, userId });
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  return note;
};

const createNote = async ({ title, description, userId }) => {
  return Note.create({ title, description, userId });
};

const updateNote = async (id, userId, { title, description }) => {
  // Only allow explicit fields — prevents mass assignment injection
  const note = await Note.findOneAndUpdate(
    { _id: id, userId },
    { title, description },
    { new: true, runValidators: true }
  );
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  return note;
};

const deleteNote = async (id, userId) => {
  const note = await Note.findOneAndDelete({ _id: id, userId });
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }
  return note;
};

module.exports = { getNotes, getSingleNote, createNote, updateNote, deleteNote };
