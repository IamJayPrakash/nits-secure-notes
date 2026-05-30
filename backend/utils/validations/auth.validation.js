const { body } = require("express-validator");

exports.registerValidation = [
  body("name")
    .trim()
    .escape()                               // XSS: strip HTML tags
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2–50 characters")
    .matches(/^[a-zA-Z\s'-]+$/).withMessage("Name can only contain letters, spaces, hyphens and apostrophes"),

  body("email")
    .trim()
    .normalizeEmail()                       // lowercase, strip dots in gmail etc.
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6, max: 100 }).withMessage("Password must be 6–100 characters")
    .matches(/\d/).withMessage("Password must contain at least one number"),
];

exports.loginValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ max: 100 }).withMessage("Invalid password"),
];