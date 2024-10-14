import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	accountType: {
		type: String,
		enum: ["admin", "student", "instructor"],
		required: true,
	},
	email: {
		type: String,
		required: true,
    trim: true,
	},
	additionalDetails: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile",
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	courseProgress: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CourseProgress",
			required: true,
		},
	],
  image: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
