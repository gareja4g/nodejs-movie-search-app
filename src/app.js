const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(passport.initialize());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorMiddleware);

module.exports = app;
