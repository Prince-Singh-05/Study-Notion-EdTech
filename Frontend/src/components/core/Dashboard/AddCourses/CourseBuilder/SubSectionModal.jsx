import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
	createSubSection,
	updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../CourseInformation/Upload";
import IconButton from "../../../../common/IconButton";

const SubSectionModal = ({
	modalData,
	setModalData,
	edit = false,
	view = false,
	add = false,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
	} = useForm();

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);

	useEffect(() => {
		if (view || edit) {
			setValue("lectureTitle", modalData.title);
			setValue("lectureDesc", modalData.description);
			setValue("lectureVideo", modalData.video);
			setValue("lectureTimeDuration", modalData.timeDuration);
		}
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		if (
			currentValues.lectureTitle !== modalData.title ||
			currentValues.lectureDesc !== modalData.description ||
			currentValues.lectureVideo !== modalData.video ||
			currentValues.lectureTimeDuration !== modalData.timeDuration
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleEditSubSection = async () => {
		const currentValues = getValues();
		const formData = new FormData();

		formData.append("sectionId", modalData.sectionId);
		formData.append("subSectionId", modalData._id);

		if (currentValues.lectureTitle !== modalData.title) {
			formData.append("title", currentValues.lectureTitle);
		}

		if (currentValues.lectureDesc !== modalData.description) {
			formData.append("description", currentValues.lectureDesc);
		}

		if (currentValues.lectureVideo !== modalData.video) {
			formData.append("videoLecture", currentValues.lectureVideo);
		}

		if (currentValues.lectureTimeDuration !== modalData.timeDuration) {
			formData.append("timeDuration", currentValues.lectureTimeDuration);
		}

		setLoading(true);
		const result = await updateSubSection(formData, token);

		if (result) {
			dispatch(setCourse(result));
		}
		setModalData(null);
		setLoading(false);
	};

	const onSubmit = async (data) => {
		console.log("sub-section data", data);
		console.log("sub-section modal data", modalData);

		if (view) return;

		if (edit) {
			if (!isFormUpdated) {
				toast.error("Please make changes to save");
			} else {
				// edit the lecture
				handleEditSubSection();
			}
			return;
		}

		const formData = new FormData();
		formData.append("sectionId", modalData);
		formData.append("courseId", course._id);
		formData.append("title", data.lectureTitle);
		formData.append("description", data.lectureDesc);
		formData.append("timeDuration", data.timeDuration);
		formData.append("videoFile", data.lectureVideo);

		setLoading(true);
		const result = await createSubSection(formData, token);

		if (result) {
			dispatch(setCourse(result));
		}

		setModalData(null);
		setLoading(false);
	};

	return (
		<div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
			<div className="flex flex-col gap-y-3 bg-richblack-900 p-6 rounded-lg">
				<div className="flex items-center justify-between">
					<p>
						{view && "Viewing"} {add && "Adding"}{" "}
						{edit && "Editing"} Lecture
					</p>
					<button
						onClick={() => (!loading ? setModalData(null) : {})}
					>
						<RxCross1 />
					</button>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-6"
				>
					<Upload
						name="lectureVideo"
						label="Lecture Video"
						register={register}
						setValue={setValue}
						errors={errors}
						video={true}
						viewData={view ? modalData.videoUrl : null}
						editData={edit ? modalData.videoUrl : null}
					/>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="lectureTitle" className="label-style">
							Lecture Title
						</label>
						<input
							id="lectureTitle"
							name="lectureTitle"
							type="text"
							placeholder="Enter Lecture Title"
							{...register("lectureTitle", { required: true })}
							className="form-style"
						/>
						{errors.lectureTitle && (
							<span>Lecture Title is required</span>
						)}
					</div>

					<div className="flex flex-col gap-y-2">
						<label htmlFor="lectureDesc" className="label-style">
							Lecture Description
						</label>
						<textarea
							id="lectureDesc"
							name="lectureDesc"
							rows={4}
							placeholder="Enter Lecture Description"
							{...register("lectureDesc", { required: true })}
							className="form-style"
						/>
						{errors.lectureDesc && (
							<span>Lecture Description is required</span>
						)}
					</div>

					{!view && (
						<div>
							<IconButton
								text={
									loading
										? "loading..."
										: edit
										? "Save changes"
										: "Save"
								}
							/>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default SubSectionModal;
