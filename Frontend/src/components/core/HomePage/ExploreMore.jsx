import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore.js";
import HighlightText from "../../common/HighlightText.jsx";
import CourseCard from "./CourseCard.jsx";

const tabsName = [
	"Free",
	"New to coding",
	"Most popular",
	"Skills paths",
	"Career paths",
];

const ExploreMore = () => {
	const [currentTab, setCurrentTab] = useState(tabsName[0]);
	const [courses, setCourses] = useState(HomePageExplore[0].courses);
	const [currentCard, setCurrentCard] = useState(
		HomePageExplore[0].courses[0].heading
	);

	const setMyCard = (value) => {
		setCurrentTab(value);
		const result = HomePageExplore.filter((course) => course.tag === value);
		setCourses(result[0].courses);
		setCurrentCard(result[0].courses[0].heading);
	};

	return (
		<div className="flex flex-col items-center max-w-maxContent w-full mx-auto justify-center">
			<div className="text-4xl font-semibold">
				Unlock the{" "}
				<HighlightText
					text={"Power of Code"}
					gradient={
						"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
					}
				/>
			</div>
			<p className="text-center text-richblack-300 text-lg mt-3">
				Learn to build anything you can imagine
			</p>

			<div className="flex md:flex-col flex-row md:items-center items-start">
				<div className="hidden sm:flex gap-2 md:rounded-full rounded-lg md:flex-row flex-col bg-richblack-800 my-5 border-richblack-700 border p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] font-medium">
					{tabsName.map((element, index) => {
						return (
							<div
								key={index}
								className={`text-[16px] flex items-center gap-2 ${
									currentTab === element
										? "bg-richblack-900 text-richblack-5 font-medium"
										: "bg-richblack-800 text-richblack-200"
								} md:rounded-full rounded-lg transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
								onClick={() => setMyCard(element)}
							>
								{element}
							</div>
						);
					})}
				</div>

				<div className="hidden lg:block lg:h-[250px]"></div>

				{/* Course Cards  */}
				<div className="flex gap-10 lg:justify-between justify-center flex-wrap w-11/12 mx-auto lg:absolute lg:bottom-[50px] lg:translate-y-[45%] mb-7 mt-5 lg:mb-0">
					{courses.map((element, index) => {
						return (
							<CourseCard
								key={index}
								cardData={element}
								currentCard={currentCard}
								setCurrentCard={setCurrentCard}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ExploreMore;
