const { body, query } = require("express-validator");

exports.noteValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 1, max: 1000 }).withMessage("Title must be under 1000 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 1, max: 50000 }).withMessage("Description must be under 50,000 characters"),
];

exports.sortValidation = [
  query("sortBy")
    .optional()
    .isIn(["createdAt", "updatedAt"])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];