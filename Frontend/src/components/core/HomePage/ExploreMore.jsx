import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore.js";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard.jsx";

const tabsName = [
	"Free",
	"New to coding",
	"Most popular",
	"Skill paths",
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
		<div className="flex flex-col items-center">
			<div className="text-4xl font-semibold">
				Unlock the <HighlightText text={"Power of Code"} />
			</div>
			<p className="text-center text-richblack-300 text-[16px] mt-3">
				Learn to build anything you can imagine
			</p>

			<div className="flex gap-2 rounded-full bg-richblack-800 my-5 border-richblack-700 border p-1">
				{tabsName.map((element, index) => {
					return (
						<div
							key={index}
							className={`text-[16px] flex items-center gap-2 ${
								currentTab === element
									? "bg-richblack-900 text-richblack-5 font-medium"
									: "bg-richblack-800 text-richblack-200"
							} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
							onClick={() => setMyCard(element)}
						>
							{element}
						</div>
					);
				})}
			</div>

			<div className="lg:h-[250px]"></div>

			{/* Course Cards  */}
			<div className="flex gap-10 justify-between w-11/12 absolute lg:bottom-[50px] lg:translate-y-[45%]">
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
	);
};

export default ExploreMore;
