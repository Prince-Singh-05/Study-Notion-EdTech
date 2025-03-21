import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		courseName: {
			type: String,
		},
		courseDescription: {
			type: String,
		},
		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		whatYouWillLearn: {
			type: String,
		},
		courseContent: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Section",
			},
		],
		ratingAndReview: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "RatingAndReview",
			},
		],
		price: {
			type: Number,
		},
		thumbnail: {
			type: String,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		tags: {
			type: [String],
		},
		studentsEnrolled: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],
		instructions: {
			type: [String],
		},
		status: {
			type: String,
			enum: ["draft", "published"],
			lowercase: true,
		},
	},
	{ timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
