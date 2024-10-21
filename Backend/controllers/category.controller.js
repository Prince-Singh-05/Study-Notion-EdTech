import Category from "../models/category.model.js";

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
			message: "Error while creating a category",
		});
	}
};

const getAllCategories = async (req, res) => {
	try {
		const categories = Category.find({}, { name: true, description: true });

		if (!categories) {
			return res.status(400).json({
				success: false,
				message: "categories not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "All categories fetched successfully",
			data: categories,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error while fetching categories",
		});
	}
};

const getCategoryPageDetails = async (req, res) => {
	try {
		// get categoryId from req body, validate data
		const { categoryId } = req.body;
		if (!categoryId) {
			return res.status(400).json({
				success: false,
				message: "category id is required",
			});
		}

		// get all courses with selected category
		const selectedCategory = await Category.findById(categoryId)
			.populate({
				path: "courses",
				populate: {
					path: "ratingAndReview studentsEnrolled",
				},
			})
			.exec();
		const selectedCourses = selectedCategory.courses;

		// check if there is some course present with slected category or not
		if (selectedCourses.length === 0) {
			return res.json({
				success: false,
				message: "There are no courses add for given category",
			});
		}

		// get most-popular course for selected category
		const mostPopularCourses = selectedCourses.sort((a, b) => {
			const aAvgRating =
				a.ratingAndReview.reduce(
					(acc, review) => acc + review.rating,
					0
				) / a.ratingAndReview.length;
			const bAvgRating =
				b.ratingAndReview.reduce(
					(acc, review) => acc + review.rating,
					0
				) / b.ratingAndReview.length;
			return bAvgRating - aAvgRating;
		});

		// get new course for selected category
		const newCourses = selectedCourses.sort(
			(a, b) => b.createdAt - a.createdAt
		);

		// get trending course for selected category
		const trendingCourses = selectedCourses.sort(
			(a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
		);

		// get courses for diffrent category and sort them with rating
		const diffrentCategories = await Category.find({
			_id: { $ne: categoryId },
		})
			.populate({
				path: "courses",
				populate: {
					path: "ratingAndReview studentsEnrolled",
				},
			})
			.exec();

		const diffrentCategoriesCourses = diffrentCategories.map(
			(category) => ({
				categoryName: category.name,
				topCourses: category.courses
					.sort((a, b) => {
						const aAvgRating =
							a.ratingAndReview.reduce(
								(acc, review) => acc + review.rating,
								0
							) / a.ratingAndReview.length;
						const bAvgRating =
							b.ratingAndReview.reduce(
								(acc, review) => acc + review.rating,
								0
							) / b.ratingAndReview.length;
						return bAvgRating - aAvgRating;
					})
					.slice(0, 5), // top 5 courses for other categories
			})
		);

		// get top-selling courses from all category
		const topSellingCourses = await Course.find()
			.sort(
				(a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
			)
			.slice(0, 10); // top 10 courses 

		// return response
		return res.status(200).json({
			success: true,
			message: "All category page details fetched successfully",
			selectedCategoryData: {
				most_popular: mostPopularCourses,
				new_courses: newCourses,
				trending_courses: trendingCourses,
			},
			otherCoursesData: {
				top_five_courses_with_diffrent_categories:
					diffrentCategoriesCourses,
				top_selling_courses: topSellingCourses,
			},
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching category page details",
		});
	}
};

export { createCategory, getAllCategories, getCategoryPageDetails };
