import Section from "../models/section.model.js";
import Course from "../models/course.model.js";
import SubSection from "../models/subSection.model.js";

const createSection = async (req, res) => {
	try {
		// get data from req.body, data validation
		const { sectionName, courseId } = req.body;
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message:
					"Section name and Course id are required to create a section",
			});
		}

		// create new entry in DB
		const newSection = await Section.create({
			sectionName,
		});

		// add this section to course model
		await Course.findByIdAndUpdate(courseId, {
			$push: {
				courseContent: newSection._id,
			},
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "Section created successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while creating a new section",
		});
	}
};

const getAllSectionsForACourse = async (req, res) => {
	try {
		// get data from req.body, data validation
		const { courseId } = req.body;

		if (!courseId) {
			return res.status(400).json({
				success: false,
				message:
					"Course id are required to fetch all sections for the course",
			});
		}

		// fetch all sections for a course
		const courseDetails = await Course.findById(courseId)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSections",
				},
			})
			.exec();

		const allSections = courseDetails.courseContent;

		// return response
		return res.status(200).json({
			success: true,
			message:
				"All sections for a perticular course are fetched successfully",
			allSections,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while fetching all sections for a course",
		});
	}
};

const updateSection = async (req, res) => {
	try {
		// get data from req.body
		const { sectionId, sectionName } = req.body;
		// validate data
		if (!sectionId || !sectionName) {
			return res.status(400).json({
				success: false,
				message: "All fields are reuired",
			});
		}

		// update the entry in DB
		await Section.findByIdAndUpdate(sectionId, { sectionName });

		// return response
		return res.status(200).json({
			success: true,
			message: "Section updated successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error in updating section details",
		});
	}
};

const deleteSection = async (req, res) => {
	try {
		const { sectionId, courseId } = req.body;

		if (!sectionId || !courseId) {
			return res.status(400).json({
				success: false,
				message:
					"Section id and course id is required to delete a section",
			});
		}

		const section = await Section.findByIdAndDelete(sectionId);

		const subSections = section.subSections;

		subSections.map(async (subSection) => {
			await SubSection.findByIdAndDelete(subSection);
		});

		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: section._id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Section deleted successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while deleting section for a course",
		});
	}
};

export {
	createSection,
	getAllSectionsForACourse,
	updateSection,
	deleteSection,
};
