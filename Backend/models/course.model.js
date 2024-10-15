import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	studentEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
