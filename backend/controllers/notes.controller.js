// ─────────────────────────────────────────────────────────────────────────────
// controllers/notes.controller.js — Notes Request Controller Handlers
//
// This file contains the route handlers for notes endpoints.
// Controllers are thin: they read incoming request data (body, params, query, user context),
// delegate the actual work to the Service layer (notesService),
// and format the JSON response using our response utility.
// ─────────────────────────────────────────────────────────────────────────────

const notesService = require("../services/notes.service");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Handles fetching all notes for the authenticated user.
 * Supports query parameters for sorting and ordering.
 */
const getNotes = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    // req.user is set by authMiddleware; we pass its userId to fetch notes
    const notes = await notesService.getNotes(req.user.userId, { sortBy, order });
    return sendSuccess(res, 200, "Notes fetched", notes);
  } catch (error) {
    // Send 500 error unless the error has a specific status code set
    return sendError(res, error.statusCode || 500, error.message);
  }
};

/**
 * Handles fetching a single note by ID.
 * Verifies that the note belongs to the authenticated user.
 */
const getSingleNote = async (req, res) => {
  try {
    const note = await notesService.getSingleNote(req.params.id, req.user.userId);
    return sendSuccess(res, 200, "Note fetched", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

/**
 * Handles creating a new note.
 * Binds the authenticated user's ID to the note document.
 */
const createNote = async (req, res) => {
  try {
    const note = await notesService.createNote({ ...req.body, userId: req.user.userId });
    return sendSuccess(res, 201, "Note created", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

/**
 * Handles updating an existing note by ID.
 * Sanitizes input body dynamically by delegating to services.
 */
const updateNote = async (req, res) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.user.userId, req.body);
    return sendSuccess(res, 200, "Note updated", note);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

/**
 * Handles deleting a note by ID.
 */
const deleteNote = async (req, res) => {
  try {
    await notesService.deleteNote(req.params.id, req.user.userId);
    return sendSuccess(res, 200, "Note deleted");
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

module.exports = { getNotes, getSingleNote, createNote, updateNote, deleteNote };