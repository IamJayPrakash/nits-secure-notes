const { body } = require("express-validator");

exports.noteValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title required"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content required"),
];