import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
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
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
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
			},
		],
		image: {
			type: String,
			required: true,
		},
		token: {
			type: String,
		},
		resetPasswordExpiry: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
