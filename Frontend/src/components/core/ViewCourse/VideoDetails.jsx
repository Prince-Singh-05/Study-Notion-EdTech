import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { IoPlay } from "react-icons/io5";
import IconButton from "../../common/IconButton";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";

const VideoDetails = () => {
	const { courseId, sectionId, lectureId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const playerRef = useRef();
	const { token } = useSelector((state) => state.auth);
	const { courseSectionData, courseEntireData, completedLectures } =
		useSelector((state) => state.viewCourse);

	const [videoData, setVideoData] = useState([]);
	const [videoEnded, setVideoEnded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			if (!courseSectionData.length) return;
			if (!courseId || !sectionId || !lectureId) {
				navigate("/dashboard/enrolled-courses");
			} else {
				const filteredData = courseSectionData?.filter(
					(section) => section._id === sectionId
				);

				const filteredVideoData = filteredData[0]?.subSections?.filter(
					(data) => data._id === lectureId
				);

				setVideoData(filteredVideoData[0]);
				setVideoEnded(false);
			}
		})();
	}, [courseEntireData, courseSectionData, location.pathname]);

	const currSectionIndex = courseSectionData.findIndex(
		(data) => data._id === sectionId
	);

	const currLectureIndex = courseSectionData[
		currSectionIndex
	]?.subSections.findIndex((data) => data._id === lectureId);

	const noOfLectures =
		courseSectionData[currSectionIndex]?.subSections.length;

	const isFirstLecture = () => {
		if (currSectionIndex === 0 && currLectureIndex === 0) {
			return true;
		}

		return false;
	};

	const isLastLecture = () => {
		if (
			currSectionIndex === courseSectionData.length - 1 &&
			currLectureIndex === noOfLectures - 1
		)
			return true;

		return false;
	};

	const goToNextLecture = () => {
		if (currLectureIndex !== noOfLectures - 1) {
			// same section -> next video
			const nextLectureId =
				courseSectionData[currSectionIndex]?.subSections[
					currLectureIndex + 1
				]?._id;

			navigate(
				`/view-course/${courseId}/section/${sectionId}/lecture/${nextLectureId}`
			);
		} else {
			// next section -> first video
			const nextSectionId = courseSectionData[currSectionIndex + 1]?._id;
			const nextLectureId =
				courseSectionData[currSectionIndex + 1]?.subSections[0]?._id;

			navigate(
				`/view-course/${courseId}/section/${nextSectionId}/lecture/${nextLectureId}`
			);
		}
	};

	const goToPrevLecture = () => {
		if (currLectureIndex !== 0) {
			// same section -> prev video
			const prevLectureId =
				courseSectionData[currSectionIndex]?.subSections[
					currLectureIndex - 1
				]?._id;

			navigate(
				`/view-course/${courseId}/section/${sectionId}/lecture/${prevLectureId}`
			);
		} else {
			// prev section -> last video
			const prevSectionId = courseSectionData[currSectionIndex - 1]?._id;
			const subSectionLength =
				courseSectionData[currSectionIndex - 1]?.subSections?.length;
			const prevLectureId =
				courseSectionData[currSectionIndex - 1]?.subSections[
					subSectionLength - 1
				]?._id;

			navigate(
				`/view-course/${courseId}/section/${prevSectionId}/lecture/${prevLectureId}`
			);
		}
	};

	const handleLectureCompletion = async () => {
		setLoading(true);
		try {
			const res = await markLectureAsComplete(
				{ courseId: courseId, subSectionId: lectureId },
				token
			);

			if (res) {
				dispatch(updateCompletedLectures(lectureId));
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<div>
			{!videoData ? (
				<div>No Data Found!</div>
			) : (
				<Player
					ref={playerRef}
					aspectRatio="16:9"
					playsInline={true}
					onEnded={() => setVideoEnded(true)}
					src={videoData?.videoUrl}
				>
					<IoPlay />
					{videoEnded && (
						<div>
							{!completedLectures.includes(lectureId) && (
								<IconButton
									disabled={loading}
									onclick={() => handleLectureCompletion()}
									text={
										!loading
											? "Mark as Completed"
											: "Loading..."
									}
								/>
							)}

							<IconButton
								disabled={loading}
								onclick={() => {
									if (playerRef?.current) {
										playerRef?.current?.seek(0);
										setVideoEnded(false);
									}
								}}
								text={"Rewatch"}
								customClasses={"text-xl"}
							/>

							<div>
								{!isFirstLecture() && (
									<button
										disabled={loading}
										onClick={goToPrevLecture}
										className="blackButton"
									>
										Prev
									</button>
								)}

								{!isLastLecture() && (
									<button
										disabled={loading}
										onClick={goToNextLecture}
										className="blackButton"
									>
										Next
									</button>
								)}
							</div>
						</div>
					)}
				</Player>
			)}

			<h1>{videoData?.title}</h1>

			<p>{videoData?.description}</p>
		</div>
	);
};

export default VideoDetails;
