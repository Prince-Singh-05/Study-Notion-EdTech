import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	HiOutlineArrowRight,
	HiOutlineCurrencyRupee,
	HiOutlineSave,
} from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import {
	addCourse,
	editCourseDetails,
	fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import IconButton from "../../../../common/IconButton";
import { toast } from "react-hot-toast";

const CourseInformationForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { course, editCourse } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const categories = await fetchCourseCategories();
			if (categories.length > 0) {
				setCourseCategories(categories);
			}
			setLoading(false);
		};

		if (editCourse) {
			setValue("courseTitle", course.courseName);
			setValue("courseDescription", course.courseDescription);
			setValue("coursePrice", course.price);
			setValue("courseCategory", course.category);
			setValue("courseTags", course.tags);
			setValue("courseThumbnail", course.thumbnail);
			setValue("courseBenefits", course.whatYouWillLearn);
			setValue("courseRequirements", course.instructions);
		}

		getCategories();
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();

		// console.log(currentValues);
		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseDescription !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseCategory._id !== course.category._id ||
			currentValues.courseTags.toString() !== course.tags.toString() ||
			currentValues.courseThumbnail !== course.thumbnail ||
			currentValues.courseRequirements.toString() !==
				course.instructions.toString() ||
			currentValues.courseBenefits !== course.whatYouWillLearn
		) {
			return true;
		} else {
			return false;
		}
	};

	console.log("currentValues", getValues());

	const onSubmit = async (data) => {
		if (editCourse) {
			if (isFormUpdated()) {
				const currentValues = getValues();
				const formData = new FormData();

				console.log({ data });
				console.log({ currentValues });

				formData.append("courseId", course._id);
				if (currentValues.courseTitle !== course.courseName) {
					formData.append("courseName", data.courseTitle);
				}
				if (
					currentValues.courseDescription !== course.courseDescription
				) {
					formData.append(
						"courseDescription",
						data.courseDescription
					);
				}
				if (currentValues.coursePrice !== course.coursePrice) {
					formData.append("price", data.coursePrice);
				}
				if (currentValues.courseCategory !== course.category._id) {
					formData.append("categoryId", data.courseCategory);
				}
				if (
					currentValues.courseTags.toString() !==
					course.courseTags.toString()
				) {
					formData.append("tags", data.courseTags);
				}
				if (currentValues.courseThumbnail !== course.courseThumbnail) {
					formData.append("thumbnail", data.courseThumbnail);
				}
				if (
					currentValues.courseRequirements.toString() !==
					course.courseRequirements.toString()
				) {
					formData.append(
						"instructions",
						JSON.stringify(data.courseRequirements)
					);
				}
				if (currentValues.courseBenefits !== course.courseBenefits) {
					formData.append("whatYouWillLearn", data.courseBenefits);
				}

				setLoading(true);
				const result = await editCourseDetails(formData, token);
				setLoading(false);
				if (result) {
					dispatch(setStep(2));
					dispatch(setCourse(result));
				}
			} else {
				toast.error("Please make changes to save");
			}
			return;
		}

		// create a new course
		const formData = new FormData();
		formData.append("courseName", data.courseTitle);
		formData.append("courseDescription", data.courseDescription);
		formData.append("price", data.coursePrice);
		formData.append("categoryId", data.courseCategory);
		formData.append(
			"instructions",
			JSON.stringify(data.courseRequirements)
		);
		formData.append("thumbnail", data.courseThumbnail);
		formData.append("tags", JSON.stringify(data.courseTags));
		formData.append("whatYouWillLearn", data.courseBenefits);

		console.log("formData before add course", formData);

		setLoading(true);
		const result = await addCourse(formData, token);
		if (result) {
			dispatch(setStep(2));
			dispatch(setCourse(result));
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-6 mt-10 rounded-lg border border-richblack-600 p-6"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="courseTitle" className="label-style">
					Course Title <sup className="text-pink-200">*</sup>
				</label>
				<input
					type="text"
					name="courseTitle"
					id="courseTitle"
					className="form-style"
					{...register("courseTitle", { required: true })}
					placeholder="Enter Course Title"
				/>
				{errors.courseTitle && <span>Course Title is Required</span>}
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="courseDescription" className="label-style">
					Course Description <sup className="text-pink-200">*</sup>
				</label>
				<textarea
					name="courseDescription"
					id="courseDescription"
					rows={4}
					className="form-style"
					{...register("courseDescription", { required: true })}
					placeholder="Enter Course Description"
				/>
				{errors.courseDescription && (
					<span>Course Description is Required</span>
				)}
			</div>

			<div className="flex flex-col gap-2 relative">
				<label htmlFor="coursePrice" className="label-style">
					Course Price <sup className="text-pink-200">*</sup>
				</label>
				<input
					type="number"
					inputMode="numeric"
					name="coursePrice"
					id="coursePrice"
					className="form-style pl-14"
					{...register("coursePrice", {
						required: true,
						valueAsNumber: true,
					})}
					placeholder="Enter Course Price"
				/>
				<HiOutlineCurrencyRupee className="absolute top-1/2 w-8 h-8 left-2 text-richblack-400" />
				{errors.coursePrice && <span>Course Price is Required</span>}
			</div>

			<div className="flex flex-col gap-2">
				<label>
					Course Category <sup className="text-pink-200">*</sup>
				</label>

				<select
					id="courseCategory"
					defaultValue={""}
					{...register("courseCategory", { required: true })}
					className="form-style"
				>
					<option value={""} disabled>
						Choose a Category
					</option>
					{courseCategories.map((category) => (
						<option
							key={category._id}
							value={category._id}
							className="capitalize"
						>
							{category.name}
						</option>
					))}
				</select>
				{errors.courseCategory && (
					<span>Course Category is required</span>
				)}
			</div>

			{/* Custom tags input */}
			<ChipInput
				label="Tags"
				name="courseTags"
				placeholder="Press Enter or , to add a tag"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>

			{/* Custom File Upload input */}
			<Upload
				name="courseThumbnail"
				label="Course Thumbnail"
				register={register}
				setValue={setValue}
				errors={errors}
			/>

			<div className="flex flex-col gap-2">
				<label htmlFor="courseBenefits" className="label-style">
					Benefits of the course{" "}
					<sup className="text-pink-200">*</sup>
				</label>
				<textarea
					id="courseBenefits"
					name="courseBenefits"
					rows={4}
					className="form-style"
					{...register("courseBenefits", { required: true })}
					placeholder="Enter Course Benefits"
				/>
				{errors.courseBenefits && (
					<span>Course Benefits is Required</span>
				)}
			</div>

			<RequirementField
				name="courseRequirements"
				label="Requirements/Instructions"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>

			<div className="flex justify-end gap-4">
				{editCourse && (
					<button
						onClick={() => dispatch(setStep(2))}
						className="flex items-center gap-2 bg-richblack-300"
					>
						Continue Without Saving
					</button>
				)}

				<IconButton text={!editCourse ? "Next" : "Save Changes"}>
					{!editCourse ? (
						<HiOutlineArrowRight className="text-xl" />
					) : (
						<HiOutlineSave className="text-xl" />
					)}
				</IconButton>
			</div>
		</form>
	);
};

export default CourseInformationForm;
