import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

const CourseCard = ({ course }) => {
	return (
		<div className="flex gap-3">
			<img
				src={course.thumbnail}
				alt={`course-${course.title}`}
				className="w-[200px] h-[100px] object-cover rounded-md"
			/>
			<div className="flex flex-col gap-1">
				<h1 className="font-semibold text-white text-lg">
					{course.courseName}
				</h1>
				<p className="font-medium text-sm text-richblack-300">
					{course.courseDescription}
				</p>
				<p className="font-medium text-sm text-white">
					Created: {formatDate(course?.createdAt)}
				</p>
				<div
					className={`flex gap-x-2 items-center rounded-lg px-2 max-w-max ${
						course.status === "draft"
							? "bg-yellow-700 bg-opacity-50"
							: "bg-green-700 bg-opacity-50"
					}`}
				>
					<FaCheckCircle
						className={`${
							course.status === "draft"
								? "text-yellow-50"
								: "text-green-400"
						}`}
					/>
					<p
						className={`font-medium text-base ${
							course.status === "draft"
								? "text-yellow-50"
								: "text-green-400"
						} capitalize`}
					>
						{course.status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
