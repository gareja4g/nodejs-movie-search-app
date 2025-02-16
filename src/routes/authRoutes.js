const express = require("express");
const passport = require("passport");
const { googleAuthRedirect, getUserProfile, logoutUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"],  prompt: "select_account", }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthRedirect);
router.get("/me", authMiddleware, getUserProfile);
router.get("/logout", logoutUser);

module.exports = router;
