import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	deleteCourse,
	fetchInstructorCourses,
} from "../../../services/operations/courseDetailsAPI";
import IconButton from "../../common/IconButton";
import { IoMdAdd } from "react-icons/io";
import CourseCard from "../../common/CourseCard";
import { MdDelete, MdEdit } from "react-icons/md";
import { setEditCourse } from "../../../redux/slices/courseSlice";
import ConfirmationModal from "../../common/ConfirmationModal";

const MyCourses = () => {
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const dispatch = useDispatch();
	const [confirmationModal, setConfirmationModal] = useState(null);

	const fetchCourses = async () => {
		const result = await fetchInstructorCourses(token);

		if (result) {
			setCourses(result);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const handleEditCourse = (courseId) => {
		dispatch(setEditCourse(true));
		navigate(`/dashboard/edit-course/${courseId}`);
	};

	const handleDeleteCourse = async (courseId) => {
		console.log("courseId", courseId);
		console.log("token", token);

		await deleteCourse(courseId, token);
		fetchCourses();

		setConfirmationModal(null);
	};

	return (
		<div className="text-richblack-5 flex flex-col justify-center p-6 gap-y-6">
			<div className="flex justify-between">
				<h1 className="font-semibold text-3xl">MyCourse</h1>
				<IconButton
					text={"Add Course"}
					onclick={() => navigate("/dashboard/add-course")}
				>
					<IoMdAdd />
				</IconButton>
			</div>
			{courses.length > 0 ? (
				<table className="w-full text-sm text-left text-richblack-300 table-auto">
					<thead className="border-b border-richblack-700">
						<tr>
							<th className="p-4 font-semibold uppercase">
								Courses
							</th>
							<th className="p-4 font-semibold uppercase">
								Duration
							</th>
							<th className="p-4 font-semibold uppercase">
								Price
							</th>
							<th className="p-4 font-semibold uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course._id}>
								<td className="p-4">
									<CourseCard course={course} />
								</td>
								<td></td>
								<td className="p-4 font-medium text-lg text-start text-richblack-300">
									₹ {course.price}
								</td>
								<td className="p-4">
									<div className="flex gap-x-4">
										<button
											type="button"
											className="text-xl text-richblack-300"
											onClick={() =>
												handleEditCourse(course._id)
											}
										>
											<MdEdit />
										</button>
										<button
											type="button"
											className="text-xl text-richblack-300"
											onClick={() =>
												setConfirmationModal({
													text1: "Delete Course",
													text2: "This Course will be deleted",
													btn1Text: "Delete",
													btn2Text: "Cancel",
													btn1Handler: () =>
														handleDeleteCourse(
															course._id
														),
													btn2Handler: () =>
														setConfirmationModal(
															null
														),
												})
											}
										>
											<MdDelete />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-center text-xl font-semibold text-richblack-300">
					No Courses Added Yet
				</p>
			)}

			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</div>
	);
};

export default MyCourses;
