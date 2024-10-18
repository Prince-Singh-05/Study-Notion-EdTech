import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinary";

connectCloudinary();

const uploadFileOnCloudinary = async (file, folder, height, quality) => {
	try {
		const options = {
			folder,
			resourceType: "auto",
		};

		if (height) {
			options.height = height;
		}

		if (quality) {
			options.quality = quality;
		}

		return await cloudinary.uploader.upload(file.tempFilePath, options);
	} catch (error) {
		console.log(
			"Error while uploading file to cloudinary: ",
			error.message
		);
	}
};

export default uploadFileOnCloudinary;