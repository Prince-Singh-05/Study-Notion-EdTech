import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model("Category", categorySchema);

export default Category;
