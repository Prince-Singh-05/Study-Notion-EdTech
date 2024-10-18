import mongoose, { mongo } from "mongoose";

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
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
});

const RatingAndReview = mongoose.model(
	"RatingAndReview",
	ratingAndReviewSchema
);

export default RatingAndReview;
