const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      issuer: "Secure-Notes-App",
      audience: "users",
    }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.REFRESH_TOKEN_SECRET || "super_secret_refresh_key_change_in_prod",
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
      issuer: "Secure-Notes-App",
      audience: "users",
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };