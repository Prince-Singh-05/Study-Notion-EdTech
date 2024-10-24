import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimeLineImage.png";

const TimeLineSection = () => {
	const timeline = [
		{
			Logo: Logo1,
			Heading: "Leadership",
			Description: "Fully committed to the success company",
		},
		{
			Logo: Logo2,
			Heading: "Responsibility",
			Description: "Students will always be our top priority",
		},
		{
			Logo: Logo3,
			Heading: "Flexibility",
			Description: "The ability to switch is an important skills",
		},
		{
			Logo: Logo4,
			Heading: "Solve the problem",
			Description: "Code your way to a solution",
		},
	];

	return (
		<div className="flex gap-14 items-center">
			<div className="flex flex-col w-[50%] gap-8">
				{/* add verticla line */}
				{timeline.map((element, index) => {
					return (
						<div className="flex gap-6 py-4 px-3" key={index}>
							<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white">
								<img src={element.Logo} />
							</div>
							<div className="flex flex-col">
								<h3 className="font-semibold text-[18px]">
									{element.Heading}
								</h3>
								<p>{element.Description}</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="relative shadow-[20px_20px_0px_0px_#fff]">
				<img
					src={timeLineImage}
					alt="time line image"
					className="object-fit h-fit"
				/>
				<div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-7 px-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<div className="gap-6 flex items-center border-r border-caribbeangreen-300 pr-7">
						<p className="text-3xl font-bold">10</p>
						<p className="text-sm text-caribbeangreen-300">
							Years of Experience
						</p>
					</div>

					<div className="gap-6 flex items-center border-l border-caribbeangreen-300 pl-7">
						<p className="text-3xl font-bold">250</p>
						<p className="text-sm text-caribbeangreen-300">
							Type of Courses
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimeLineSection;
