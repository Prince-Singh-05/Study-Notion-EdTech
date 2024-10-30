import React from "react";
import Signup from "../../../pages/Signup";
import Login from "../../../pages/Login";
import frame from "../../../assets/Images/frame.png";

const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
	return (
		<div className="flex justify-between gap-y-12 md:gap-x-12 md:gap-y-0 py-12">
			<div className="max-w-[450px] w-11/12 mx-auto md:mx-0">
				<h1 className="font-semibold text-[1.875rem] leading-[2.375rem]">
					{title}
				</h1>
				<p className="text-[1.175rem] leading-[1.625rem] mt-4">
					<span>{desc1}</span>
					<span className="text-blue-400 italic">{desc2}</span>
				</p>

				{formType === "signup" ? (
					<Signup setIsLoggedIn={setIsLoggedIn} />
				) : (
					<Login setIsLoggedIn={setIsLoggedIn} />
				)}

				<div className="w-full flex items-center gap-x-2 my-4">
					<div className="flex-1 h-[1px] bg-slate-700"></div>
					<p className="text-slate-700 font-medium text-[0.875rem] leading-[1.375rem]">
						OR
					</p>
					<div className="flex-1 h-[1px] bg-slate-700"></div>
				</div>

				<button className="w-full items-center flex justify-center gap-x-2 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-slate-300 border border-slate-700">
					<img />
					<p>Sign in with Google</p>
				</button>
			</div>

			<div className="relative w-11/12 max-w-[450px] mx-auto md:mx-0">
				<img
					src={image}
					alt="Image"
					width={558}
					height={504}
					loading="lazy"
					className="absolute -top-4 right-4 z-10"
				/>
				<img
					src={frame}
					alt="Image Frame"
					width={558}
					height={504}
					loading="lazy"
				/>
			</div>
		</div>
	);
};

export default Template;
