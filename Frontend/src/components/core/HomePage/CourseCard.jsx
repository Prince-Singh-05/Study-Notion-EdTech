import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { PiTreeViewFill } from "react-icons/pi";

const CourseCard = ({ currentCard, setCurrentCard, cardData }) => {
	return (
		<div
			className={`flex flex-col flex-1 h-[300px] select-none justify-between ${
				currentCard === cardData.heading
					? "bg-white text-richblack-900 shadow-[12px_12px_0px_0px_#f6e05e]"
					: "bg-richblack-800 text-white"
			}`}
			onClick={() => setCurrentCard(cardData.heading)}
		>
			<div className={`flex flex-col pb-14 pt-8 px-6 gap-4 `}>
				<h2 className="font-semibold text-xl">{cardData.heading}</h2>
				<p className="text-richblack-400">{cardData.description}</p>
			</div>

			<div
				className={`flex justify-between px-6 py-4 border-t-2 border-dashed  ${
					currentCard === cardData.heading
						? "text-[#0A5A72]"
						: "text-richblack-200"
				}`}
			>
				<div className="flex flex-between items-center gap-2">
					<HiMiniUsers /> {cardData.level}
				</div>
				<div className="flex flex-between items-center gap-2">
					<PiTreeViewFill /> {cardData.lessionNumber} Lessons
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
