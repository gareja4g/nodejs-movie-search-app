const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/movies", movieController.getMoviesByName);
router.get("/movies/:id", movieController.getMovieById);

module.exports = router;