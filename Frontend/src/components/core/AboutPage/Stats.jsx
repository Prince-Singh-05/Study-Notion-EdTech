import React from "react";

const Stats = [
	{ count: "5K", label: "Active Students" },
	{ count: "10+", label: "Mentors" },
	{ count: "200+", label: "Courses" },
	{ count: "50+", label: "Awards" },
];

const StatsComponent = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 w-11/12 mx-auto text-richblack-5 justify-between max-w-maxContent py-24 gap-10 text-center">
			{Stats.map((element, index) => {
				return (
					<div
						key={index}
						className="flex flex-col gap-y-2 text-center"
					>
						<h2 className="font-semibold text-4xl font-inter">
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
