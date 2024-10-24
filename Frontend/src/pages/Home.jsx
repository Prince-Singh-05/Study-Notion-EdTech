import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText.jsx";
import CTAButton from "../components/core/HomePage/Button.jsx";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx";
import TimeLineSection from "../components/core/HomePage/TimeLineSection.jsx";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection.jsx";
import InstructorSection from "../components/core/HomePage/InstructorSection.jsx";
import Footer from "../components/common/Footer.jsx";
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";

const Home = () => {
	return (
		<div>
			{/* Section 1 */}
			<section className="flex relative mx-auto flex-col w-11/12 items-center text-white justify-center max-w-maxContent">
				{/* Top Section */}
				<div className="flex flex-col items-center">
					<Link to={"/signup"}>
						<div className="bg-richblack-800 mx-auto rounded-full font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1 group">
							<button className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
								<p>Become an Instructor</p>
								<FaArrowRightLong />
							</button>
						</div>
					</Link>
					<h2 className="text-center text-4xl font-semibold mt-7">
						Empower Your Future with
						<HighlightText text={"Coding Skills"} />
					</h2>
					<p className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 mx-auto">
						With our online coding courses, you can learn at your
						own pace, from anywhere in the world, and get access to
						a wealth of resources, including hands-on projects,
						quizzes, and personalized feedback from instructors.{" "}
					</p>
					<div className="flex gap-7 mt-8 mx-auto">
						<CTAButton active={true} linkto={"/login"}>
							Learn More
						</CTAButton>
						<CTAButton active={false} linkto={"/login"}>
							Book a demo
						</CTAButton>
					</div>
				</div>

				{/* Video section */}
				<div className="mt-12 mx-3 shadow-[20px_20px_0px_0px_#fff]">
					<video muted loop autoPlay>
						<source src={Banner} type="video/mp4" />
					</video>
				</div>

				{/* code section 1 */}
				<div>
					<CodeBlocks
						position={`lg:flex-row`}
						heading={
							<div>
								Unlock your{" "}
								<HighlightText text={"coding potential"} /> with
								our online courses.
							</div>
						}
						subHeading={
							"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
						}
						ctabtn1={{
							active: true,
							text: "Try it Yourself",
							linkto: "/signup",
						}}
						ctabtn2={{
							active: false,
							text: "Learn More",
							linkto: "/login",
						}}
						codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css"/>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n\t<a href="one/">One</a>\n\t<a href="two/">Two</a>\n\t<a href="three/">Three</a>\n</nav>`}
						codeColor={"text-yellow-25"}
					/>
				</div>

				{/* code section 2 */}
				<div>
					<CodeBlocks
						position={`lg:flex-row-reverse`}
						heading={
							<div>
								Start{" "}
								<HighlightText text={"coding in seconds"} />
							</div>
						}
						subHeading={
							"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
						}
						ctabtn1={{
							active: true,
							text: "Continue Lesson",
							linkto: "/signup",
						}}
						ctabtn2={{
							active: false,
							text: "Learn More",
							linkto: "/login",
						}}
						codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css"/>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n\t<a href="one/">One</a>\n\t<a href="two/">Two</a>\n\t<a href="three/">Three</a>\n</nav>`}
						codeColor={"text-yellow-25"}
					/>
				</div>

				{/* Catalog Section */}
				<ExploreMore />
			</section>

			{/* Section 2 */}
			<section className="bg-pure-greys-5 text-richblack-700">
				<div className="homepage_bg h-[310px]">
					<div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 justify-between mx-auto">
						<div className="h-[150px]"></div>
						<div className="flex gap-7 text-white mx-auto">
							<CTAButton active={true} linkto={"/signup"}>
								<div className="flex items-center gap-2">
									Explore Full Catalog <FaArrowRightLong />
								</div>
							</CTAButton>
							<CTAButton active={false} linkto={"/signup"}>
								Learn More
							</CTAButton>
						</div>
					</div>
				</div>

				<div className="flex flex-col max-w-maxContent w-11/12 mx-auto justify-center items-center gap-7">
					<div className="flex gap-3 mb-10 mt-[100px]">
						<div className="text-4xl font-semibold w-[50%]">
							Get the skills you need for a
							<HighlightText text={"Job that is in demand"} />
						</div>
						<div className="flex flex-col w-[50%] gap-10">
							<p className="text-[16px]">
								The modern StudyNotion is the dictates its own
								terms. Today, to be a competitive specialist
								requires more than professional skills.
							</p>
							<CTAButton active={true} linkto={"/signup"}>
								Learn More
							</CTAButton>
						</div>
					</div>

					<TimeLineSection />
					<LearningLanguageSection />
				</div>
			</section>

			{/* Section 3 */}
			<section className="flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-between gap-8 text-white my-20">
				<InstructorSection />

				<h2 className="text-center text-4xl font-semibold mt-10">
					Review from other learners
				</h2>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Home;
