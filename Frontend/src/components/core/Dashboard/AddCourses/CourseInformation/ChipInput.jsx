import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";

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

	const { editCourse, course } = useSelector((state) => state.course);

	useEffect(() => {
		if (editCourse) {
			setTagList(JSON.parse(course?.tags));
		}

		register(name, {
			required: true,
			// validate: (value) => value.length > 0,
		});
	}, []);

	useEffect(() => {
		setValue(name, tagList);
	}, [tagList]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();

			setTag(e.target.value.trim());

			if (tag && !tagList.includes(tag)) {
				setTagList([...tagList, tag]);
				e.target.value = "";
			}
		}
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
				type="text"
				placeholder={placeholder}
				className="form-style"
				onKeyDown={handleKeyDown}
			/>
			{errors[name] && <span>{label} is required</span>}
		</div>
	);
};

export default ChipInput;
