const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model
const ErrorResponse = require("../utils/ErrorResponse");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ErrorResponse("Unauthorized - No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-googleId");

    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorResponse("Invalid or expired token", 401));
  }
};

module.exports = authMiddleware;
