import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import Tab from "../../common/Tab.jsx";
import { ENROLLED_COURSE_TYPE } from "../../../utils/constants.js";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
	const { token } = useSelector((state) => state.auth);
	const [enrolledCourses, setEnrolledCourses] = useState(null);
	const [courseStatus, setCourseStatus] = useState(ENROLLED_COURSE_TYPE.ALL);
	const navigate = useNavigate();

	const tabData = [
		{
			id: 1,
			type: ENROLLED_COURSE_TYPE.ALL,
			tabName: "all",
		},
		{
			id: 2,
			type: ENROLLED_COURSE_TYPE.PENDING,
			tabName: "pending",
		},
		{
			id: 3,
			type: ENROLLED_COURSE_TYPE.COMPLETED,
			tabName: "completed",
		},
	];

	const getEnrolledCourses = async () => {
		try {
			const response = await getUserEnrolledCourses(token);
			setEnrolledCourses(response);
		} catch (error) {
			console.log("Unable to fetch Enrolled Courses");
		}
	};

	useEffect(() => {
		getEnrolledCourses();
	}, []);

	return (
		<div className="text-richblack-5 flex flex-col justify-center p-6 gap-y-6">
			<h2 className="font-semibold text-3xl">Enrolled Courses</h2>

			<div className="flex flex-col">
				<Tab
					tabData={tabData}
					field={courseStatus}
					setField={setCourseStatus}
				/>

				{!enrolledCourses ? (
					<div className="spinner">Loading...</div>
				) : !enrolledCourses.length ? (
					<p>You have not enrolled in any course yet</p>
				) : (
					<div>
						<div>
							<p>Course Name</p>
							<p>Durations</p>
							<p>Progress</p>
						</div>

						{enrolledCourses.map((course, index) => (
							<div key={index}>
								<div
									onClick={() =>
										navigate(
											`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/lecture/${course?.courseContent[0]?.subSections[0]?._id}`
										)
									}
								>
									<img
										src={course.thumbnail}
										alt="Course Thumbnail"
									/>
									<div>
										<p>{course.courseName}</p>
										<p>{course.courseDescription}</p>
									</div>
								</div>

								<div>{"Time Duration"}</div>

								<div>
									<p>
										Progress:{" "}
										{course?.progressPercentage || 0}%
									</p>
									<ProgressBar
										completed={
											course?.progressPercentage || 0
										}
										height="8px"
										isLabelVisible={false}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default EnrolledCourses;
