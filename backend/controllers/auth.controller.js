const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const { registerUser, loginUser } = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/response");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return sendSuccess(res, 201, "User registered successfully", user);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendError(res, 400, "Refresh token required");
    }

    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || "super_secret_refresh_key_change_in_prod"
      );
    } catch (err) {
      return sendError(res, 401, "Invalid refresh token");
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return sendError(res, 401, "Invalid or expired refresh token");
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    return sendSuccess(res, 200, "Tokens refreshed successfully", {
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

const logout = async (req, res) => {
  try {
    if (req.user && req.user.userId) {
      const user = await User.findById(req.user.userId);
      if (user) {
        user.refreshToken = "";
        await user.save();
      }
    }
    return sendSuccess(res, 200, "Logout successful");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

module.exports = { register, login, refresh, logout };