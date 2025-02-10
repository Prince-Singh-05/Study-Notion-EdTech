import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import {
	setCourse,
	setEditCourse,
	setStep,
} from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import {
	createSection,
	updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const [editSectionName, setEditSectionName] = useState(null);
	const { course } = useSelector((state) => state.course);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.auth);

	const cancelEdit = () => {
		setEditSectionName(null);
		setValue("sectionName", "");
	};

	const goBack = () => {
		dispatch(setStep(1));
		dispatch(setEditCourse(true));
	};

	const goToNext = () => {
		if (course.courseContent.length === 0) {
			toast.error("Please add at least one section");
			return;
		}

		if (
			course.courseContent.some(
				(section) => section.subSections.length === 0
			)
		) {
			toast.error("Please add at least one lecture in each section");
			return;
		}

		dispatch(setStep(3));
	};

	const onSubmit = async (data) => {
		setLoading(true);
		let result;

		if (editSectionName) {
			// editing the section
			result = await updateSection(
				{
					sectionName: data.sectionName,
					sectionId: editSectionName,
					courseId: course._id,
				},
				token
			);
		} else {
			// creating a new section
			result = await createSection(
				{
					sectionName: data.sectionName,
					courseId: course._id,
				},
				token
			);
		}

		// update the course content
		if (result) {
			dispatch(setCourse(result));
			setEditSectionName(null);
			setValue("sectionName", "");
		}

		setLoading(false);
	};

	const handleChangeEditSectionName = (sectionId, sectionName) => {
		if (editSectionName === sectionId) {
			cancelEdit();
			return;
		}

		setEditSectionName(sectionId);
		setValue("sectionName", sectionName);
	};

	return (
		<div className="flex flex-col gap-6 rounded-lg border border-richblack-600 p-6">
			<p>Course Builder</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 mt-10"
			>
				<div className="flex flex-col gap-2">
					<label className="label-style" htmlFor="sectionName">
						Section Name <sup className="text-pink-200">*</sup>
					</label>
					<input
						id="sectionName"
						name="sectionName"
						type="text"
						placeholder="Enter Section Name"
						{...register("sectionName", { required: true })}
						className="form-style"
					/>
					{errors.sectionName && (
						<span>Section Name is required</span>
					)}
				</div>

				<div>
					<IconButton
						type={"Submit"}
						text={
							editSectionName
								? "Edit Section Name"
								: "Create Section"
						}
						outline={true}
					>
						{editSectionName ? (
							<MdEdit className="text-xl" />
						) : (
							<IoMdAddCircleOutline className="text-xl" />
						)}
					</IconButton>

					{editSectionName && (
						<button
							type="button"
							className="text-sm text-richblack-300 underline"
							onClick={cancelEdit}
						>
							Cancel Edit
						</button>
					)}
				</div>
			</form>

			{course.courseContent.length > 0 && (
				<NestedView
					handleChangeEditSectionName={handleChangeEditSectionName}
				/>
			)}

			<div className="flex items-center gap-x-3 justify-end">
				<button
					onClick={goBack}
					type="button"
					className="rounded-lg bg-richblack-500 px-4 py-2 text-white"
				>
					Back
				</button>

				<button
					type="button"
					onClick={goToNext}
					className="rounded-lg flex items-center gap-2 bg-richblack-500 px-4 py-2 text-white"
				>
					Next
					<HiArrowRight />
				</button>
			</div>
		</div>
	);
};

export default CourseBuilderForm;
