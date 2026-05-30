const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: "Secure-Notes-App",
      audience: "users",
    }
  );
};

module.exports = generateToken;