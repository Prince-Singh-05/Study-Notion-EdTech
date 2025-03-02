import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	resetCourseState,
	setEditCourse,
	setStep,
} from "../../../../../redux/slices/courseSlice";
import IconButton from "../../../../common/IconButton";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
	const { register, handleSubmit, setValue, getValues } = useForm();

	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (course?.status === COURSE_STATUS.PUBLISHED) {
			setValue("publish", true);
		}
	}, []);

	const goBack = () => {
		dispatch(setStep(2));
	};

	const goToCourses = () => {
		dispatch(resetCourseState());
		navigate("/dashboard/my-courses");
	};

	const publishCourse = async () => {
		if (
			(course?.status === COURSE_STATUS.PUBLISHED &&
				getValues("publish") === true) ||
			(course?.status === COURSE_STATUS.DRAFT &&
				getValues("publish") === false)
		) {
			goToCourses();
			setLoading(false);
			dispatch(setStep(1));
			dispatch(setEditCourse(null));
			return;
		}

		const formData = new FormData();
		formData.append("courseId", course?._id);
		const courseStatus = getValues("publish")
			? COURSE_STATUS.PUBLISHED
			: COURSE_STATUS.DRAFT;
		formData.append("status", courseStatus);

		setLoading(true);
		const result = await editCourseDetails(formData, token);

		if (result) {
			goToCourses();
		}

		setLoading(false);
	};

	const onSubmit = (data) => {
		setLoading(true);
		publishCourse(data);
	};

	return (
		<div className="flex flex-col gap-6 rounded-md border bg-richblack-800 p-6 border-richblack-700 text-white">
			<p>Publish Course</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label
						htmlFor="publish"
						className="flex items-center gap-2"
					>
						<input
							type="checkbox"
							id="publish"
							name="publish"
							{...register("publish")}
							className="rounded h-4 w-4"
						/>
						<span>Mark this Course as Public</span>
					</label>
				</div>

				<div className="flex justify-end gap-x-3">
					<button
						disabled={loading}
						type="button"
						onClick={goBack}
						className="flex items-center gap-2 rounded bg-richblack-500 px-4 py-2 text-white"
					>
						Back
					</button>
					<IconButton
						disabled={loading}
						type={"submit"}
						text="Save Changes"
					/>
				</div>
			</form>
		</div>
	);
};

export default PublishCourse;
