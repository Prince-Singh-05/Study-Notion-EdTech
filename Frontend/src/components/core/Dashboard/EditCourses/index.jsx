import React, { useEffect } from "react";
import RenderSteps from "../AddCourses/RenderSteps";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const EditCourse = () => {
	const params = useParams();
	const courseId = params.courseId;
	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);

	useEffect(() => {
		const fetchCourse = async () => {
			const result = await fetchCourseDetails(courseId);

			dispatch(setCourse(result));
			dispatch(setEditCourse(true));
		};

		fetchCourse();
	}, []);

	return (
		<div className="text-richblack-5 flex flex-col p-6 justify-center gap-4">
			<h1 className="font-semibold text-3xl">Edit Course</h1>
			<div className="w-full flex flex-col gap-10 xl:pl-24 transition-all duration-1000">
				{course ? <RenderSteps /> : <div>No course found</div>}
			</div>
		</div>
	);
};

export default EditCourse;
