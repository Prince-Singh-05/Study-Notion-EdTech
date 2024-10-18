import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		timeDuration: {
			type: String,
		},
		description: {
			type: String,
		},
		videoURL: {
			type: String,
		},
	},
	{ timestamps: true }
);

const SubSection = mongoose.model("SubSection", subSectionSchema);

export default SubSection;
