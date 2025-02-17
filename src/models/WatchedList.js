const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userRating: { type: Number, default: null },
  countRatingDecisions: { type: Number, default: 0 },
  ntRatingDecisions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
module.exports = Watchlist;