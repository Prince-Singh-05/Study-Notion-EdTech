import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
	setCompletedLectures,
	setCourseSectionData,
	setEntireCourseData,
	setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
	const [reviewModal, setReviewModal] = useState(false);
	const { courseId } = useParams();
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const setCourseDetails = async () => {
			const courseData = await getFullDetailsOfCourse(courseId, dispatch);
			console.log("COURSE DATA", courseData);
			dispatch(
				setCourseSectionData(courseData?.courseDetails?.courseContent)
			);
			dispatch(setEntireCourseData(courseData?.courseDetails));
			dispatch(setCompletedLectures(courseData?.completedVideos));
			let lectures = 0;
			courseData?.courseDetails?.courseContent?.forEach((sec) => {
				lectures += sec.subSections.length || 0;
			});
			dispatch(setTotalNoOfLectures(lectures));
		};

		setCourseDetails();
	}, []);

	return (
		<>
			<div>
				<VideoDetailsSidebar setReviewModal={setReviewModal} />
				<div>
					<Outlet />
				</div>
			</div>
			{reviewModal && (
				<CourseReviewModal setReviewModal={setReviewModal} />
			)}
		</>
	);
};

export default ViewCourse;
