import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({ name, label, register, errors, setValue }) => {
	const [file, setFile] = useState("");

	useEffect(() => {
		register(name, {
			required: true,
		});
	}, []);

	const handleFileUpload = (e) => {
		setFile(e.target.files[0]);
		console.log(`${label} file`, e.target.files[0]);
		setValue(name, e.target.files[0]);
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="file-upload" className="label-style">
				{label} <sup className="text-pink-200">*</sup>
			</label>
			{file ? (
				<div className="flex flex-col gap-4 items-center">
					<img
						src={URL.createObjectURL(file)}
						alt="course-image"
						className="h-64 rounded-lg"
					/>
					<button
						onClick={() => setFile(null)}
						className="text-md text-richblack-5 underline"
					>
						Remove Image
					</button>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center border-dashed border border-richblack-400 rounded-lg py-10 px-6 cursor-pointer gap-4 bg-richblack-800 relative">
					<input
						type="file"
						id="file-upload"
						className="opacity-0 absolute z-10 top-0 left-0 w-full h-full cursor-pointer"
						onChange={handleFileUpload}
						value={file}
					/>
					<div className="flex items-center justify-center bg-richblack-900 rounded-full w-16 h-16 cursor-pointer">
						<FiUploadCloud className="text-3xl text-yellow-50 " />
					</div>
					<p>
						Drag and drop an image, or click to{" "}
						<span className="text-yellow-50">Browse</span> a file
					</p>
					<ul className="flex justify-between gap-4 text-sm text-richblack-400">
						<li>Aspect ratio should be 16:9</li>
						<li>Recommended size is 1024x576</li>
					</ul>
				</div>
			)}
			{errors[name] && <span>`${label} is required`</span>}
		</div>
	);
};

export default Upload;
