import React from "react";
import CTAButton from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Ellipse2 from "../../../assets/Ellipse 2.png";

const CodeBlocks = ({
	position,
	heading,
	subHeading,
	ctabtn1,
	ctabtn2,
	backgroundGradient,
	codeColor,
	codeBlock,
}) => {
	return (
		<div className={`flex ${position} my-20 justify-center gap-10`}>
			{/* Section 1 */}
			<div className="w-[50%] flex flex-col gap-8">
				<h2 className="text-4xl font-semibold">{heading}</h2>
				<div className="text-richblack-300 font-bold">{subHeading}</div>
				<div className="flex gap-7 mt-7">
					<CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
						<div className="flex gap-2 items-center">
							{ctabtn1.text}
							<FaArrowRightLong />
						</div>
					</CTAButton>
					<CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
						<div className="flex gap-2 items-center">
							{ctabtn2.text}
						</div>
					</CTAButton>
				</div>
			</div>

			{/* Section 2 */}
			<div className="h-fit flex text-[10px] w-[100%] p-2 gap-2 lg:w-[500px] relative border-2 border-transparent">
				{/* add gradient in bg */}
				<div className="absolute -top-[100px] -left-[100px]">
					<img src={Ellipse2} />
				</div>

				<div className="text-center flex flex-col w-fit text-richblack-400 font-mono text-sm font-bold px-1">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
					<p>12</p>
				</div>

				<div
					className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-sm ${codeColor}`}
				>
					<TypeAnimation
						sequence={[codeBlock, 5000, ""]}
						repeat={Infinity}
						cursor={true}
						omitDeletionAnimation={true}
						style={{
							whiteSpace: "pre-line",
							display: "block",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CodeBlocks;
