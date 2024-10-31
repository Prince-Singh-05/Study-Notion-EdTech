import React, { useState } from "react";
import frame from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import { ACCOUNT_TYPE } from "../../../utils/constant.js";
import Tab from "../../common/Tab.jsx";
import { FcGoogle } from "react-icons/fc";

const Template = ({
	title,
	desc1,
	desc2,
	imageStudent,
	imageInstructor,
	formType,
}) => {
	const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

	const tabData = [
		{
			id: 1,
			type: ACCOUNT_TYPE.STUDENT,
			tabName: "Student",
		},
		{
			id: 2,
			type: ACCOUNT_TYPE.INSTRUCTOR,
			tabName: "Instructor",
		},
	];

	return (
		<div className="flex w-11/12 max-w-maxContent flex-1 mx-auto justify-between items-center gap-y-12 md:gap-x-12 md:gap-y-0 py-12">
			<div className="max-w-[450px] w-11/12 mx-auto md:mx-0">
				<h1 className="font-semibold text-[1.875rem] leading-[2.375rem] text-richblack-5">
					{title}
				</h1>
				<p className="text-[1.175rem] leading-[1.625rem] mt-4">
					<span className="text-richblack-100 font-inter font-[400] text-[1.125rem] leading-[1.625rem]">
						{desc1}{" "}
					</span>
					{accountType === "instructor" ? (
						<span className="text-blue-100 font-edu-sa font-bold text-[1rem] leading-6 italic">
							{"Be Unstopable"}
						</span>
					) : (
						<span className="text-blue-100 font-edu-sa font-bold text-[1rem] leading-6 italic">
							{desc2}
						</span>
					)}
				</p>

				<div>
					<Tab
						tabData={tabData}
						field={accountType}
						setField={setAccountType}
					/>
				</div>

				{formType === "signup" ? (
					<SignupForm accountType={accountType} />
				) : (
					<LoginForm accountType={accountType} />
				)}

				<div className="w-full flex items-center gap-x-2 my-4">
					<div className="flex-1 h-[1px] bg-richblack-500"></div>
					<p className="text-richblack-500 font-medium text-[0.875rem] leading-[1.375rem]">
						OR
					</p>
					<div className="flex-1 h-[1px] bg-richblack-500"></div>
				</div>

				<button className="w-full items-center flex justify-center gap-x-2 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-300 border border-slate-700">
					<FcGoogle />
					<p>Sign in with Google</p>
				</button>
			</div>

			<div className="relative w-11/12 max-w-[450px] mx-auto md:mx-0">
				{accountType === "instructor" ? (
					<img
						src={imageInstructor}
						alt="Instructor Image"
						width={558}
						height={504}
						loading="lazy"
						className="absolute -top-4 right-4 z-10"
						// there is problem with image size
					/>
				) : (
					<img
						src={imageStudent}
						alt="Image"
						width={558}
						height={504}
						loading="lazy"
						className="absolute -top-4 right-4 z-10"
					/>
				)}
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
