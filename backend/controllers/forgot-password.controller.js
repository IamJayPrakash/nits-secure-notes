const { forgotPassword } = require("../services/forgot-password.service");
const { sendSuccess, sendError } = require("../utils/response");

const forgotPasswordHandler = async (req, res) => {
  try {
    await forgotPassword(req.body);
    return sendSuccess(res, 200, "If an account exists, a reset link has been sent");
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

module.exports = { forgotPasswordHandler };
