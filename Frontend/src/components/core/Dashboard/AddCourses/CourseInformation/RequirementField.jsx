import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RequirementField = ({
	name,
	label,
	register,
	errors,
	setValue,
	getValues,
}) => {
	const [requirement, setRequirement] = useState("");
	const [requirementList, setRequirementList] = useState([]);

	useEffect(() => {
		register(name, {
			required: true,
			validate: (value) => value.length > 0,
		});
	}, []);

	useEffect(() => {
		setValue(name, requirementList);
	}, [requirementList]);

	const handleAddRequirement = () => {
		if (requirement.length === 0) {
			return;
		}

		setRequirementList([...requirementList, requirement]);
		setRequirement("");
	};

	const handleRemoveRequirement = (index) => {
		const updatedRequirementList = [...requirementList];
		updatedRequirementList.splice(index, 1);
		setRequirementList(updatedRequirementList);
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name} className="label-style">
				{label} <sup className="text-pink-200">*</sup>
			</label>
			<div className="flex flex-col gap-2 relative">
				<input
					name={name}
					id={name}
					className="form-style pr-16"
					value={requirement}
					placeholder="Enter Requirements/Instructions"
					onChange={(e) => setRequirement(e.target.value)}
				/>
				<button
					type="button"
					className="font-semibold w-max text-yellow-200 absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-2"
					onClick={handleAddRequirement}
				>
					Add
				</button>
			</div>

			{requirementList.length > 0 && (
				<ul>
					{requirementList.map((item, index) => (
						<li
							key={index}
							className="flex items-center gap-2 text-richblack-5"
						>
							<span>{item}</span>
							<button
								type="button"
								className="text-sm text-richblack-300"
								onClick={() => handleRemoveRequirement(index)}
							>
								clear
							</button>
						</li>
					))}
				</ul>
			)}
			{errors[name] && <span>{label} is required</span>}
		</div>
	);
};

export default RequirementField;
