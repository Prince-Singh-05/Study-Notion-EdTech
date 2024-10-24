import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
	return (
		<div className="flex flex-col gap-5 mt-[130px] items-center mb-20">
			<div className="text-4xl font-semibold text-center">
				Your Swiss Knife for
				<HighlightText text={"learning any language"} />
			</div>

			<div className="text-center text-richblack-600 mx-auto text-base font-medium w-[85%]">
				Using spin making learning multiple languages easy. with 20+
				languages realistic voice-over, progress tracking, custom
				schedule and more.
			</div>

			<div className="flex justify-center mt-5">
				<img
					src={knowYourProgress}
					alt="know your progress"
					className="object-contain -mr-32"
				/>
				<img
					src={compareWithOthers}
					alt="compare with others"
					className="object-contain"
				/>
				<img
					src={planYourLessons}
					alt="plan your lessons"
					className="object-contain -ml-36"
				/>
			</div>

			<div className="w-fit">
				<CTAButton active={true} linkto={"/signup"}>
					Learn More
				</CTAButton>
			</div>
		</div>
	);
};

export default LearningLanguageSection;
