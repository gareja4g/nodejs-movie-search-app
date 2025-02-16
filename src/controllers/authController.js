const generateToken = require("../utils/generateToken");
const responseHandler = require("../utils/responseHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.googleAuthRedirect = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ErrorResponse("Authentication failed", 400);
    }

    const token = generateToken(req.user);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Redirect to React frontend with token in query params
    return res.redirect(`${process.env.CLIENT_URL}/movies?token=${token}`);
  } catch (error) {
    next(error);
  }
};


exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ErrorResponse("User not found", 404);
    }

    responseHandler(res, 200, true, "User profile retrieved successfully", req.user);
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    responseHandler(res, 200, true, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
