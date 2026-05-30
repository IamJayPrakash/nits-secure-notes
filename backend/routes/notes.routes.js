const express = require("express");

const {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { noteValidation } = require("../middlewares/notes.validation");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getNotes);

router.get("/:id", getSingleNote);

router.post("/", noteValidation, validate, createNote);

router.put("/:id", noteValidation, validate, updateNote);

router.delete("/:id", deleteNote);

module.exports = router;