const User = require("../models/User");

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("No account found with that email");
    error.statusCode = 404;
    throw error;
  }
  return { email };
};

module.exports = { forgotPassword };
