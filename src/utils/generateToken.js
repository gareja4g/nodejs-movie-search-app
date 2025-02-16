const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
};

module.exports = generateToken;
