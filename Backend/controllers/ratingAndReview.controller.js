import RatingAndReview from "../models/ratingAndReview.model";
import Course from "../models/course.model";
import mongoose from "mongoose";

// create Rating/Review
const createRating = async (req, res) => {
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
		await Course.findByIdAndUpdate(courseId, {
			$push: {
				ratingAndReview: newRatingAndReview._id,
			},
		});

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

// getAverageRating
const getAverageRating = async (req, res) => {
	try {
		// get courseId from req body, validation
		const { courseId } = req.body;

		if (!courseId) {
			return res.status(400).json({
				success: false,
				message: "Course id is required to get average rating",
			});
		}

		// find all reviews for the course and aggregate the averageRating
		const result = await RatingAndReview.aggregate([
			{
				$match: { course: mongoose.Types.ObjectId(courseId) },
			},
			{
				$group: { _id: null, averageRating: { $avg: "$rating" } },
			},
		]);

		// check if there is some rating on this course
		if (result.length > 0) {
			return res.status(200).json({
				success: true,
				message: "average rating of the course fetched successfully",
				averageRating: result[0].averageRating,
			});
		}
		// return response

		return res.status(200).json({
			success: true,
			message: "there is no review on this course yet",
			averageRating: 0,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "error while fetching averageRating for a course",
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
		const { courseId } = req.body;

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

		if (!allRating) {
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

export {
	createRating,
	getAverageRating,
	getAllReviews,
	getAllReviewsForCourse,
};
