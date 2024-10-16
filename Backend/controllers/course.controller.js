import Course from "../models/course.model";
import Tag from "../models/tags.model";
import User from "../models/user.model";
import uploadImageOnCloudinary from "../utils/cloudinary";
import {} from "dotenv/config";

const createCourse = async (req, res) => {
	try {
		// get data from req.body and file from req.files
		const {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tagIds,
		} = req.body;

		const thumbnail = req.files.thumbnail;

		// validate data and file
		if (
			!courseName ||
			!courseDescription ||
			!price ||
			!tag ||
			!whatYouWillLearn
		) {
			return res.status(400).json({
				success: false,
				message: "All field are required",
			});
		}

		// instructor id
		const userId = req.user.id;

		// tags validation

		tagIds.map(async (tagId) => {
			const tagDetails = await Tag.findById(tagId);

			if (!tagDetails) {
				return res.status(400).json({
					success: false,
					message: "tag details not found",
				});
			}
		});

		// upload file to cloudinary
		const thumbnailImage = await uploadImageOnCloudinary(
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
			tags: tagIds.map((tagId) => tagId),
			thumbnail: thumbnailImage.secure_url,
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

		// add course in Tag model
		tagIds.map(async (tagId) => {
			await Tag.findByIdAndUpdate(tagId, {
				$push: {
					courses: newCourse._id,
				},
			});
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
			.populate("tags", "name")
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

export { createCourse, getAllCourses };
