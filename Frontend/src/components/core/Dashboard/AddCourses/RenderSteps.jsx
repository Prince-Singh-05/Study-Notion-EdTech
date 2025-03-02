import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
	const { step } = useSelector((state) => state.course);

	const steps = [
		{
			id: 1,
			title: "Course Information",
		},
		{
			id: 2,
			title: "Course Builder",
		},
		{
			id: 3,
			title: "Publish",
		},
	];

	return (
		<>
			<div className="flex justify-between xl:w-[70%] w-full mx-auto">
				{steps.map((item) => (
					<div key={item.id} className="flex-1">
						<div
							className={`flex flex-col gap-2 text-center justify-center`}
						>
							<span
								className={`${
									step === item.id
										? "bg-yellow-900 border-yellow-50 border text-yellow-50"
										: "border-e-richblack-700 bg-richblack-800 text-richblack-300"
								} rounded-full w-10 h-10 px-4 py-2 mx-auto flex items-center`}
							>
								{step > item.id ? (
									<FaCheck width={20} height={20} />
								) : (
									item.id
								)}
							</span>
							<span>{item.title}</span>
						</div>
						{/* Dashes between label */}
					</div>
				))}
			</div>

			{step === 1 && <CourseInformationForm />}
			{step === 2 && <CourseBuilderForm />}
			{step === 3 && <PublishCourse />}
		</>
	);
};

export default RenderSteps;
