import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		trim: true,
	},
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
