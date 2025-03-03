import Course from "../models/course.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";
import {} from "dotenv/config";
import Section from "../models/section.model.js";
import SubSections from "../models/subSection.model.js";
import CourseProgress from "../models/courseProgress.model.js";

const createCourse = async (req, res) => {
	try {
		// get data from req.body and file from req.files
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			categoryId,
			tags,
			status,
			instructions,
		} = req.body;

		const thumbnail = req.files.thumbnail;

		// console.log("req body", req.body)
		// console.log("thumbnail", thumbnail)

		// validate data and file
		if (
			!courseName ||
			!courseDescription ||
			!price ||
			!categoryId ||
			!whatYouWillLearn ||
			!tags ||
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
			tags,
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

		await Category.findByIdAndUpdate(
			categoryId,
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		// return response
		return res.status(200).json({
			success: true,
			message: "New Course added successfully",
			data: newCourse,
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
				select: "-password -token -resetPasswordExpiry",
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
					select: "-password -token -resetPasswordExpiry",
				},
			})
			.populate("category")
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

const getAllInstructorCourses = async (req, res) => {
	try {
		const instructorId = req.user.id;
		const courses = await Course.find({
			instructor: instructorId,
		})
			.populate("category")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSections",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "All courses fetched successfully",
			data: courses,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching all courses",
		});
	}
};

const deleteCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		const instructorId = req.user.id;

		if (!courseId || !instructorId) {
			return res.json({
				success: false,
				message: "course id and instructor id is required",
			});
		}

		// Delete the course
		const course = await Course.findByIdAndDelete(courseId);
		if (!course) {
			return res.json({
				success: false,
				message: "course not found",
			});
		}

		console.log("course", course);

		// Delete the sections
		const sectionIds = course.courseContent;
		const sections = await Section.deleteMany({
			_id: { $in: sectionIds },
		});

		// Delete the sub sections
		const subSectionIds = sections.subSections;
		const subSections = SubSections.deleteMany({
			_id: { $in: subSectionIds },
		});

		// unenroll students from the course
		const studentsEnrolled = course.studentsEnrolled;
		if (studentsEnrolled.length > 0) {
			await User.findByIdAndUpdate(
				{ _id: { $in: studentsEnrolled } },
				{
					$pull: { courses: courseId },
				}
			);
		}

		// Delete course id from category
		await Category.findByIdAndUpdate(course.category, {
			$pull: { courses: courseId },
		});

		// Delete course form instructor
		await User.findByIdAndUpdate(instructorId, {
			$pull: { courses: courseId },
		});

		return res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while deleting course",
		});
	}
};

const editCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		const updates = req.body;

		const course = await Course.findById(courseId);

		if (!course) {
			return res.status(400).json({
				success: false,
				message: "Course not found",
			});
		}

		// if thumbnail is present, update the thumbnail
		if (req.files) {
			const thumbnail = req.files.thumbnailImage;
			const thumbnailImage = await uploadFileOnCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			);
			course.thumbnail = thumbnailImage.secure_url;
		}

		// update only the fields that are present in the request body
		for (const key in updates) {
			if (updates.hasOwnProperty(key)) {
				if (key === "tags" || key === "instructions") {
					course[key] = JSON.parse(updates[key]);
				} else {
					course[key] = updates[key];
				}
			}
		}

		await course.save();

		const updatedCourse = await Course.findOne({
			_id: courseId,
		})
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSections",
				},
			})
			.exec();

		return res.status(200).json({
			success: true,
			message: "Course updated successfully",
			data: updatedCourse,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while updating course",
		});
	}
};

export {
	createCourse,
	getAllCourses,
	getCourseDetails,
	getAllInstructorCourses,
	deleteCourse,
	editCourse,
};
