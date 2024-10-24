import mongoose, { mongo } from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
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
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

const RatingAndReview = mongoose.model(
	"RatingAndReview",
	ratingAndReviewSchema
);

export default RatingAndReview;
