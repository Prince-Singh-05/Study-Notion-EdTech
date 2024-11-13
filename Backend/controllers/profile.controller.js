import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import schedule from "node-schedule";
import Course from "../models/course.model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";

const updateProfile = async (req, res) => {
	try {
		// get data from req body
		const { gender, dateOfBirth, about, contactNumber } = req.body;
		const userId = req.user.id;

		// data validation
		if (!userId) {
			return res.status(400).json({
				success: "false",
				message: "userId not found",
			});
		}

		// update entry in DB
		const user = await User.findById(userId)
			.populate("additionalDetails")
			.exec();

		const profileId = user.additionalDetails;

		await Profile.findByIdAndUpdate(profileId, {
			gender,
			dateOfBirth,
			about,
			contactNumber,
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "Profile details updated successfully",
			updatedUserDetails: user,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while updating profile details",
		});
	}
};

const deleteAccount = async (req, res) => {
	try {
		// get user id from req user, validate user
		const { id, accountType } = req.user;

		if (!id || !accountType) {
			return res.json({
				success: false,
				message: "req.user not found",
			});
		}

		const user = await User.findById(id);
		if (!user) {
			return res.json({
				success: false,
				message: "User not found",
			});
		}

		// schedule the account deletion process to 5 days from this date

		const deletionDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
		schedule.scheduleJob(deletionDate, async () => {
			try {
				// delete profile
				const profileId = user.additionalDetails;

				await Profile.findByIdAndDelete(profileId);

				// unenroll courses from student account
				if (accountType.toLowerCase() === "student") {
					const EnrolledCourses = user.courses;

					EnrolledCourses.map(async (courseId) => {
						await Course.findByIdAndUpdate(courseId, {
							$pull: {
								studentsEnrolled: user._id,
							},
						});
					});
				}

				// delete user
				await User.findByIdAndDelete(id);
			} catch (error) {
				console.error(error.message);
				return res.status(401).json({
					success: false,
					message: "Error while deleting the user",
				});
			}
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "Account will be deleted in 5 days from now",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(401).json({
			success: false,
			message: "Error in deleting Account",
		});
	}
};

const getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;

		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();

		return res.status(200).json({
			success: true,
			message: "User details fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching user details",
		});
	}
};

// updateProfilePicture
const updateProfilePicture = async (req, res) => {
	try {
		const { profilePicture } = req.files;
		const userId = req.user.id;

		const profileImage = await uploadFileOnCloudinary(
			profilePicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		);

		const userDetails = await User.findByIdAndUpdate(
			userId,
			{
				image: profileImage.secure_url,
			},
			{ new: true }
		);

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userId}`,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Profile Picture updated successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id;
		const userDetails = await User.findOne({ _id: userId })
			.populate("courses")
			.exec();

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userId}`,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Successfully fetched enrolled courses",
			data: userDetails.courses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export {
	updateProfile,
	deleteAccount,
	getAllUserDetails,
	updateProfilePicture,
	getEnrolledCourses,
};
