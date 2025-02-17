const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const responseHandler = require("../utils/responseHandler");
const Movie = require("../models/Movie");

const getMoviesByName = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      throw new ErrorResponse("Movie name is required", 400);
    }
    const movies = await Movie.find({ title: new RegExp(name, "i") });
    responseHandler(res, 200, true, "Movies retrieved successfully", movies);
  } catch (error) {
    next(error);
  }
});

const getMovieById = asyncHandler(async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new ErrorResponse("Movie not found", 404);
    }
    responseHandler(res, 200, true, "Movie details retrieved successfully", movie);
  } catch (error) {
    next(error);
  }
});

module.exports = { getMoviesByName, getMovieById };