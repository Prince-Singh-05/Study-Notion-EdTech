import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
	return (
		<div className="text-richblack-5 flex flex-col p-6 justify-center gap-4">
			<h1 className="font-semibold text-3xl">Add Course</h1>
			<div className="w-full flex gap-10 xl:pl-24 transition-all duration-1000">
				<div className="w-full">
					<RenderSteps />
				</div>

				<div className="xl:block hidden">
					<h2>Code Upload Tips</h2>
					<ul>
						<li>Set the Course Price option or make it free.</li>
						<li>
							Standard size for the course thumbnail is 1024x576.
						</li>
						<li>
							Video section controls the course overview video.
						</li>
						<li>
							Course Builder is where you create and organize a
							course.
						</li>
						<li>
							Add Topics in the Course Builder section to create
							lessons, quizzes, and assignments.
						</li>
						<li>
							Information from the Additional Data section shows
							up on the course single page.
						</li>
						<li>Make Announcements to notify any important.</li>
						<li>Notes to all enrolled students at once.</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AddCourse;
