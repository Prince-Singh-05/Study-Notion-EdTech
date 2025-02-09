import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

const ChipInput = ({
	label,
	name,
	placeholder,
	register,
	errors,
	setValue,
	getValues,
}) => {
	const [tagList, setTagList] = useState([]);
	const [tag, setTag] = useState("");

	useEffect(() => {
		register(name, {
			required: true,
			// validate: (value) => value.length > 0,
		});
	}, []);

	useEffect(() => {
		setValue(name, tagList);
	}, [tagList]);

	const tagInput = document.getElementById(name);

	const handleChange = (e) => {
		setTag(e.target.value);
		if (tag.length === 0) return;
		tagInput.addEventListener("keyup", (key) => {
			if (key.key === "Enter") {
				setTagList([...tagList, tag]);
				setTag("");
			}
			if (key.key === ",") {
				setTagList([...tagList, tag]);
				setTag("");
			}
			setValue(name, tagList);
		});
	};

	// console.log("current Values", getValues());

	const handleRemoveTag = (index) => {
		const updatedTagList = [...tagList];
		updatedTagList.splice(index, 1);
		setTagList(updatedTagList);
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name} className="label-style">
				{label} <sup className="text-pink-200">*</sup>
			</label>
			{tagList.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{tagList.map((tag, index) => (
						<div
							key={index}
							className="flex gap-x-2 items-center px-2 py-1 rounded-full bg-yellow-300"
						>
							<p>{tag}</p>
							<TiDelete
								className="text-xl text-richblack-5 cursor-pointer"
								onClick={() => handleRemoveTag(index)}
							/>
						</div>
					))}
				</div>
			)}
			<input
				name={name}
				id={name}
				placeholder={placeholder}
				value={tag}
				className="form-style"
				onChange={handleChange}
			/>
			{errors[name] && <span>{label} is required</span>}
		</div>
	);
};

export default ChipInput;
