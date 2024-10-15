import Tag from "../models/tags.model";

const createTag = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			return res.json({
				success: false,
				message:
					"Both name and description are required for creating a tag",
			});
		}

		const newTag = await Tag.create({
			name,
			description,
		});

		return res.status(200).json({
			success: true,
			message: "Tag created successfully",
			tag: newTag,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while creating a tag",
		});
	}
};

const getAllTags = async (req, res) => {
	try {
		const tags = Tag.find({});

		if (!tags) {
			return res.status(400).json({
				success: false,
				message: "tags not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "All tags fetched successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching tags",
		});
	}
};

export { createTag, getAllTags };
