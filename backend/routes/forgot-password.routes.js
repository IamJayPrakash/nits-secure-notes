const express = require("express");
const { body } = require("express-validator");

const { forgotPasswordHandler } = require("../controllers/forgot-password.controller");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.post(
  "/",
  [body("email").isEmail().withMessage("Valid email required")],
  validate,
  forgotPasswordHandler
);

module.exports = router;
