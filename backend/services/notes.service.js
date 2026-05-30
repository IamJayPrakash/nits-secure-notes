const Note = require("../models/Notes");

/**
 * Get all notes for a user with optional search and sort.
 * @param {string} userId
 * @param {{ search?: string, sortBy?: string, order?: string }} options
 */
const getNotes = async (userId, { search = "", sortBy = "createdAt", order = "desc" } = {}) => {
  const filter = { userId };

  if (search) {
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
    filter.$or = [
      { title: { $regex: safeSearch, $options: "i" } },
      { description: { $regex: safeSearch, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const allowedSortFields = ["createdAt", "updatedAt", "title"];
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
