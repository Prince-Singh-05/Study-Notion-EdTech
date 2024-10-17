import Category from "../models/category.model";

const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			return res.json({
				success: false,
				message:
					"Both name and description are required for creating a tag",
			});
		}

		const newCategory = await Category.create({
			name,
			description,
		});

		return res.status(200).json({
			success: true,
			message: "Category created successfully",
			category: newCategory,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while creating a tag",
		});
	}
};

const getAllCategories = async (req, res) => {
	try {
		const categories = Category.find({});

		if (!categories) {
			return res.status(400).json({
				success: false,
				message: "categories not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "All categories fetched successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching tags",
		});
	}
};

export { createCategory, getAllCategories };
