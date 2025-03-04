import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";

const CourseReviewModal = ({ setReviewModal }) => {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const { courseId } = useParams();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("courseExperience", "");
		setValue("courseRating", 0);
	}, []);

	const onSubmit = async (data) => {
		await createRating(
			{
				courseId: courseId,
				rating: data.courseRating,
				review: data.courseExperience,
			},
			token
		);
		setReviewModal(false);
	};

	const ratingChanged = (newRating) => {
		setValue("courseRating", newRating);
	};

	return (
		<div>
			<div>
				{/* Modal Header */}
				<div>
					<p>Add Review</p>
					<button onClick={() => setReviewModal(false)}>Close</button>
				</div>

				{/* Modal Body */}
				<div>
					<div>
						<img
							src={user?.image}
							alt="User Image"
							className="aspect-square w-24 rounded-full object-cover"
						/>
						<div>
							<p>
								{user?.firstName} {user?.lastName}
							</p>
							<p>Posting Publicly</p>
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col mt-6 items-center gap-y-4"
					>
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							color2="#ffd700"
						/>

						<div>
							<label
								htmlFor="courseExperience"
								className="label-style"
							>
								Add Your Experience
							</label>
							<textarea
								id="courseExperience"
								placeholder="Add Your Experience here"
								rows={5}
								{...register("courseExperience", {
									required: true,
								})}
								className="form-style"
							/>
							{errors.courseExperience && (
								<span>Please add your experience</span>
							)}
						</div>

						{/* cancel and save button */}
						<div>
							<button onClick={() => setReviewModal(false)}>
								Cancel
							</button>
							<IconButton text={"Save"} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CourseReviewModal;
