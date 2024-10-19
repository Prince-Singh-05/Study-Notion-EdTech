import Course from "../models/course.model";
import Category from "../models/category.model";
import User from "../models/user.model";
import uploadFileOnCloudinary from "../utils/cloudinary";
import {} from "dotenv/config";

const createCourse = async (req, res) => {
	try {
		// get data from req.body and file from req.files
		const {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			categoryId,
			tag,
			status,
			instructions,
		} = req.body;

		const thumbnail = req.files.thumbnail;

		// validate data and file
		if (
			!courseName ||
			!courseDescription ||
			!price ||
			!categoryId ||
			!whatYouWillLearn ||
			!tag ||
			!thumbnail
		) {
			return res.status(400).json({
				success: false,
				message: "All field are required",
			});
		}

		if (!status || status === undefined) {
			status = "draft";
		}

		// instructor id
		const userId = req.user.id;

		// category validation
		const categoryDetails = await Category.findById(categoryId);

		if (!categoryDetails) {
			return res.status(400).json({
				success: false,
				message: "category details not found",
			});
		}

		// upload file to cloudinary
		const thumbnailImage = await uploadFileOnCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

		if (!thumbnailImage) {
			return res.status(400).json({
				success: false,
				message: "thumbnail image not found",
			});
		}

		// create entry in course model
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: userId,
			price,
			whatYouWillLearn,
			category: categoryId,
			thumbnail: thumbnailImage.secure_url,
			tag,
			status,
			instructions,
		});

		// add course to user model for the instructor account
		await User.findByIdAndUpdate(
			userId,
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		// add course in Category model

		await Category.findByIdAndUpdate(categoryId, {
			$push: {
				courses: newCourse._id,
			},
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "New Course added successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while creating a new course",
		});
	}
};

const getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find({})
			.populate("category", "name")
			.populate("courseContent")
			.populate("courseContent.subSections")
			.exec();

		return res.status(200).json({
			success: true,
			message: "All courses fetched successfully",
			allCourses,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching all courses",
		});
	}
};

const getCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body;
		if (!courseId) {
			return res.json({
				success: false,
				message: "course id is required",
			});
		}

		const courseDetails = await Course.findById(courseId)
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate({
				path: "courseContent",
				populate: {
					path: "subSections",
				},
			})
			.populate({
				path: "ratingAndReview",
				populate: {
					path: "user",
				},
			})
			.populate("category")
			.populate({
				path: "studentsEnrolled",
				populate: {
					path: "addtionalDetails courses courseProgress",
				},
			})
			.exec();

		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Course not found with this ${courseId}`,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Course details fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching course details",
		});
	}
};

export { createCourse, getAllCourses, getCourseDetails };
