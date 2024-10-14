import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		trim: true,
		required: true,
	},
});

const RatingAndReview = mongoose.model(
	"RatingAndReview",
	ratingAndReviewSchema
);

export default RatingAndReview;
