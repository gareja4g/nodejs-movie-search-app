const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const responseHandler = require("../utils/responseHandler");
const WatchedList = require("../models/WatchedList");

const addToWatchedList = asyncHandler(async (req, res, next) => {
  try {
    const { movieId, userRating, countRatingDecisions, ntRatingDecisions } = req.body;
    if (!movieId) {
      throw new ErrorResponse("Movie ID is required", 400);
    }
    const watchedListItem = await WatchedList.create({
      user: req.user.id,
      movie: movieId,
      userRating,
      countRatingDecisions,
      ntRatingDecisions,
    });
    responseHandler(res, 201, true, "Movie added to watched list successfully", watchedListItem);
  } catch (error) {
    next(error);
  }
});

const getWatchedList = asyncHandler(async (req, res, next) => {
  try {
    const watchedList = await WatchedList.find({ user: req.user.id }).populate("movie");
    responseHandler(res, 200, true, "Watched list retrieved successfully", watchedList);
  } catch (error) {
    next(error);
  }
});

const removeFromWatchedList = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const watchedListItem = await WatchedList.findOneAndDelete({ _id: id, user: req.user.id });
    if (!watchedListItem) {
      throw new ErrorResponse("Watched List item not found", 404);
    }
    responseHandler(res, 200, true, "Movie removed from watched list successfully", {});
  } catch (error) {
    next(error);
  }
});

module.exports = { addToWatchedList, getWatchedList, removeFromWatchedList };