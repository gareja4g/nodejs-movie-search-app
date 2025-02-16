require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;
const SERVER_IP = process.env.SERVER_IP || "127.0.0.1";

connectDB();

const server = app.listen(PORT, SERVER_IP, () => {
  console.log(`Server running at http://${SERVER_IP}:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("\nSIGINT received! Shutting down server...");
  await shutdown();
});

process.on("SIGTERM", async () => {
  console.log("\nSIGTERM received! Shutting down server...");
  await shutdown();
});

const shutdown = async () => {
  console.log("Closing database connection...");
  await mongoose.connection.close();
  console.log("Database connection closed.");

  server.close(() => {
    console.log("Server shut down gracefully.");
    process.exit(0);
  });
};
