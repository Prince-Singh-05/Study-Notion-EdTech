import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "../../common/IconButton";

const VideoDetailsSidebar = ({ setReviewModal }) => {
	const [activeStatus, setActiveStatus] = useState("");
	const [videoBarActive, setVideoBarActive] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { sectionId, lectureId } = useParams();
	const {
		courseSectionData,
		courseEntireData,
		completedLectures,
		totalNoOfLectures,
	} = useSelector((state) => state.viewCourse);

	useEffect(() => {
		(() => {
			if (!courseSectionData.length) return;
			const currSectionIndex = courseSectionData.findIndex(
				(data) => data._id === sectionId
			);
			const currLectureIndex = courseSectionData[
				currSectionIndex
			]?.subSections?.findIndex((data) => data._id === lectureId);

			const activeLectureId =
				courseSectionData[currSectionIndex]?.subSections[
					currLectureIndex
				]?._id;

			// setting current active section
			setActiveStatus(courseSectionData[currSectionIndex]?._id);
			// setting current active lecture
			setVideoBarActive(activeLectureId);
		})();
	}, [courseSectionData, courseEntireData, location.pathname]);

	return (
		<>
			<div>
				{/* buttons and headings */}
				<div>
					{/* Buttons */}
					<div
						onClick={() => navigate("/dahsboard/enrolled-courses")}
					>
						Back
					</div>

					<div>
						<IconButton
							text={"Add Review"}
							onclick={() => setReviewModal(true)}
						/>
					</div>
					{/* Headings */}
					<div>
						<p>{courseEntireData?.courseName}</p>
						<p>
							{completedLectures?.length || 0} /{" "}
							{totalNoOfLectures || 0}
						</p>
					</div>
				</div>

				{/* sections and lectures */}
				<div>
					{courseSectionData?.map((section, index) => (
						<div
							key={index}
							onClick={() => setActiveStatus(section?._id)}
						>
							{/* section heading */}
							<div>
								<div>{section?.sectionName}</div>
							</div>

							{/* Lectures */}
							<div>
								{activeStatus === section?._id && (
									<div>
										{section?.subSections?.map(
											(lecture, index) => (
												<div
													key={index}
													className={`flex gap-x-2 ${
														videoBarActive ===
														lecture?._id
															? "bg-yellow-25 text-richblack-900"
															: "bg-richblack-900 text-white"
													}`}
													onClick={() => {
														setVideoBarActive(
															lecture?._id
														);
														navigate(
															`/view-course/${courseEntireData?._id}/section/${section?._id}/lecture/${lecture?._id}`
														);
													}}
												>
													<input
														type="checkbox"
														checked={completedLectures?.includes(
															lecture?._id
														)}
													/>
													<span>
														{lecture?.title}
													</span>
												</div>
											)
										)}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default VideoDetailsSidebar;
