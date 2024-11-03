import React from "react";
import NotFoundImg from "../assets/Images/NotFound.png";

const NotFound = () => {
	return (
		<div className="flex flex-col flex-1 w-full justify-center items-center text-richblack-100 text-4xl">
			<img
				src={NotFoundImg}
				alt="Page Not Found"
				loading="lazy"
				width={558}
				height={504}
				className="bg-transparent"
			/>
			<p>404 - Page Not Found</p>
		</div>
	);
};

export default NotFound;
