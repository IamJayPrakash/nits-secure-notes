
const notesService = require("../services/notes.service");
const { sendSuccess, sendError } = require("../utils/response");

const getNotes = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const notes = await notesService.getNotes(req.user.userId, { sortBy, order });
    return sendSuccess(res, 200, "Notes fetched", notes);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const getSingleNote = async (req, res) => {
  try {
    const note = await notesService.getSingleNote(req.params.id, req.user.userId);
    return sendSuccess(res, 200, "Note fetched", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const createNote = async (req, res) => {
  try {
    const note = await notesService.createNote({ ...req.body, userId: req.user.userId });
    return sendSuccess(res, 201, "Note created", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.user.userId, req.body);
    return sendSuccess(res, 200, "Note updated", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    await notesService.deleteNote(req.params.id, req.user.userId);
    return sendSuccess(res, 200, "Note deleted");
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

module.exports = { getNotes, getSingleNote, createNote, updateNote, deleteNote };