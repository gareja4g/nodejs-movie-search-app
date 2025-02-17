const express = require('express');
const router = express.Router();
const watchedListController = require("../controllers/watchedListController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/watched-list", watchedListController.addToWatchedList);
router.get("/watched-list", watchedListController.getWatchedList);
router.delete("/watched-list/:id", watchedListController.removeFromWatchedList);

module.exports = router;