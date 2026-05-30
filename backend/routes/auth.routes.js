const express = require("express");

const { register, login, refresh, logout } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../utils/validations/auth.validation");
const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", loginValidation, validate, login);

router.post("/refresh", refresh);

router.post("/logout", authMiddleware, logout);

module.exports = router;