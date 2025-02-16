const ErrorResponse = require("../utils/ErrorResponse");

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error("❌ Error:", err);

  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found: ${err.value}`, 404);
  }

  if (err.code === 11000) {
    error = new ErrorResponse("Duplicate field value entered", 400);
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(messages.join(", "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
