import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "../../common/HighlightText.jsx";
import CTAButton from "./Button.jsx";
import { FaArrowRightLong } from "react-icons/fa6";

const InstructorSection = () => {
	return (
		<div className="flex gap-20 items-center">
			<div className="w-[50%] shadow-[-20px_-20px_0px_0px_#fff]">
				<img
					src={Instructor}
					alt="instructor image"
					className="shadow-white"
				/>
			</div>

			<div className="flex flex-col w-[50%] gap-2">
				<div className="text-4xl font-semibold">
					Become an <br />
					<HighlightText
						text={"Instructor"}
						gradient={`bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]`}
					/>
				</div>
				<p className="font-medium text-[16px] w-[90%]">
					Instructors from around the world teach millions of students
					on StudyNotion. We provide the tools and skills to teach
					what you love.
				</p>

				<div className="mt-10 w-fit">
					<CTAButton active={true} linkto={"/signup"}>
						<div className="flex gap-2 items-center">
							Start Learning Today
							<FaArrowRightLong />
						</div>
					</CTAButton>
				</div>
			</div>
		</div>
	);
};

export default InstructorSection;
