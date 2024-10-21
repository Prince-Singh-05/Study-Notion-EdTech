import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import schedule from "node-schedule";
import Course from "../models/course.model.js";

const updateProfile = async (req, res) => {
	try {
		// get data from req body
		const { gender, dateOfBirth, about, contactNumber } = req.body;
		const userId = req.user.id;

		// data validation
		if (!gender || !dateOfBirth || !userId) {
			return res.status(400).json({
				success: "false",
				message: "gender and dateOfBirth is required",
			});
		}

		// update entry in DB
		const user = await User.findById(userId);
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

export { updateProfile, deleteAccount, getAllUserDetails };
