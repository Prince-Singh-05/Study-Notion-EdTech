import RatingAndReview from "../models/ratingAndReview.model.js";
import Course from "../models/course.model.js";

// create Rating/Review
const createReview = async (req, res) => {
	try {
		// get data from req body, userId from req.user
		const { courseId, rating, review } = req.body;
		const userId = req.user.id;

		// data validation
		if (!courseId || !rating || !review) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		// check if user is enrolled in course or not
		const courseDetails = await Course.findById(courseId, {
			studentsEnrolled: {
				$elemMatch: {
					$eq: userId,
				},
			},
		});

		if (!courseDetails) {
			return res.status(403).json({
				success: false,
				message: `Student not enrolled in ${courseDetails.courseName} course`,
			});
		}

		// check if user already given review
		const alreadyReviewed = await RatingAndReview.findOne({
			user: userId,
			course: courseId,
		});

		if (alreadyReviewed) {
			return res.status(403).json({
				success: false,
				message: "Course is already reviewed by this user",
			});
		}

		// create new entry for rating and review in DB
		const newRatingAndReview = await RatingAndReview.create({
			rating,
			review,
			user: userId,
			course: courseId,
		});

		// update course with rating/review
		await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					ratingAndReview: newRatingAndReview._id,
				},
			},
			{ new: true }
		);

		// return response
		return res.status(200).json({
			success: true,
			message: "New review created successfully",
			newRatingAndReview,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "error while creating new review",
		});
	}
};

// getAllReviews
const getAllReviews = async (req, res) => {
	try {
		const reviews = await RatingAndReview.find({})
			.populate({
				path: "user",
				select: "firstName lastName image",
			})
			.populate({
				path: "course",
				select: "courseName",
			})
			.exec();

		if (!reviews) {
			return res.status(403).json({
				success: false,
				message: "There are no reviews on the website yet",
			});
		}

		return res.status(200).json({
			success: true,
			message: "All rating and reviews fetched successfully",
			allRatingAndReviews: reviews,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "error while fetching all rating/review from website",
		});
	}
};

// getAllReviewsForCourse
const getAllReviewsForCourse = async (req, res) => {
	try {
		const { courseId } = req.params;

		if (!courseId) {
			return res.status(400).json({
				success: false,
				message: "Course id is required to get all rating for a course",
			});
		}

		const allRating = await RatingAndReview.find({ course: courseId })
			.populate({
				path: "user",
				select: "firstName lastName image",
			})
			.populate({
				path: "course",
				select: "courseName",
			})
			.exec();

		if (!allRating || allRating.length === 0) {
			return res.status(403).json({
				success: false,
				message: "There are no reviews on the course yet",
			});
		}

		return res.status(200).json({
			success: true,
			message:
				"All rating and reviews for this course are fetched successfully",
			allRatingAndReviews: allRating,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "error while fetching all rating/review for course",
		});
	}
};

export { createReview, getAllReviews, getAllReviewsForCourse };
