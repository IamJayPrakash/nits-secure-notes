const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");

const router = express.Router();


router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);
module.exports = router;