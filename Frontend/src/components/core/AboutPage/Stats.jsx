import React from "react";

const Stats = [
	{ count: "5K", label: "Active Students" },
	{ count: "10+", label: "Mentors" },
	{ count: "200+", label: "Courses" },
	{ count: "50+", label: "Awards" },
];

const StatsComponent = () => {
	return (
		<div className="flex lg:w-11/12 mx-auto items-center text-richblack-5 justify-around max-w-maxContent py-24 gap-x-3">
			{Stats.map((element, index) => {
				return (
					<div
						key={index}
						className="flex flex-col gap-y-2 text-center"
					>
						<h2 className="font-semibold text-[36px] leading-[44px] font-inter">
							{element.count}
						</h2>
						<p className="text-base font-medium text-richblack-300">
							{element.label}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default StatsComponent;
