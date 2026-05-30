const express = require("express");

const {
  createNote,
  getNotes,
  deleteNote,
} = require("../controllers/notes.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getNotes);

router.post("/", createNote);

router.delete("/:id", deleteNote);

module.exports = router;