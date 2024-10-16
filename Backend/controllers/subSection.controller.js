import SubSection from "../models/subSection.model";
import Section from "../models/section.model";
import uploadFileOnCloudinary from "../utils/cloudinary";

const createSubSection = async (req, res) => {
	try {
		// get data from req body, get videoFile from req.files
		const { title, description, timeDuration, sectionId } = req.body;
		const videoLecture = req.files.videoFile;

		// data/file validation
		if (
			!sectionId ||
			!title ||
			!description ||
			!timeDuration ||
			!videoLecture
		) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		// upload File on cloudinary
		const uploadedLecture = await uploadFileOnCloudinary(
			videoLecture,
			process.env.FOLDER_NAME
		);

		if (!uploadedLecture) {
			return res.json({
				success: false,
				message: "uploaded lecture not found",
			});
		}

		// create an entry in DB with data
		const newSubSection = await SubSection.create({
			title,
			description,
			timeDuration,
			videoURL: uploadedLecture.secure_url,
		});

		// insert this subsection id in section model
		await Section.findByIdAndUpdate(sectionId, {
			$push: {
				subSections: newSubSection._id,
			},
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "Sub Section created successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while creating a new sub section",
		});
	}
};

const updateSubSection = async (req, res) => {
	try {
		// get data from req body
		const { title, description, timeDuration, subSectionId } = req.body;
		const videoFile = req.files?.videoFile;

		// data validation
		if (
			!subSectionId ||
			!title ||
			!description ||
			!timeDuration ||
			!videoFile
		) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		// upload file on cloudinary
		const uploadedLecture = await uploadFileOnCloudinary(
			videoFile,
			process.env.FOLDER_NAME
		);

		// update entry in DB
		await SubSection.findByIdAndUpdate(subSectionId, {
			title,
			timeDuration,
			description,
			videoURL: uploadedLecture.secure_url,
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "Sub Section updated successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while updating sub section",
		});
	}
};

const deleteSubSection = async (req, res) => {
	try {
		// get subSectionId from req.body, validate data
		const { subSectionId, sectionId } = req.body;

		if (!subSectionId || !sectionId) {
			return res.status(400).json({
				success: false,
				message:
					"subSectionId and sectionId is required to delete a subSection",
			});
		}

		// pull subSectionId from Section model
		await Section.findByIdAndUpdate(sectionId, {
			$pull: {
				subSections: subSectionId,
			},
		});

		// delete subSection from DB
		await SubSection.findByIdAndDelete(subSectionId);

		// return response
		return res.status(200).json({
			success: true,
			message: "Sub Section deleted successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while deleting sub section",
		});
	}
};

export { createSubSection, updateSubSection, deleteSubSection };
