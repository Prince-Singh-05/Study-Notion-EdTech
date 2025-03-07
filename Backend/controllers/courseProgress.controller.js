import SubSection from "../models/subSection.model.js";
import CourseProgress from "../models/courseProgress.model.js";

export const updateCourseProgress = async (req, res) => {
	const { courseId, subSectionId } = req.body;
	const userId = req.user.id;

	try {
		const subSection = await SubSection.findById(subSectionId);

		if (!subSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			});
		}

		// check for old entry
		let courseProgress = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		});

		if (!courseProgress) {
			return res.status(404).json({
				success: false,
				message: "Course Progress not found",
			});
		} else {
			// check if the user has already completed the lecture
			if (courseProgress.completedVideos?.includes(subSectionId)) {
				return res.status(400).json({
					success: false,
					message: "You have already completed this lecture",
				});
			}

			// update the course progress
			courseProgress.completedVideos?.push(subSectionId);
			await courseProgress.save();
		}

		return res.status(200).json({
			success: true,
			message: "Course Progress updated successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
