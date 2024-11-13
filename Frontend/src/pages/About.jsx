import React from "react";
import HighlightText from "../components/common/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import ContactUsForm from "../components/core/ContactUsPage/ContactUsForm";
import Footer from "../components/common/Footer";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/Stats.jsx";
import LearningGrid from "../components/core/AboutPage/LearningGrid.jsx";

const About = () => {
	return (
		<div className="mt-14">
			{/* Section 1 */}
			<section className="bg-richblack-800">
				<div className="flex relative mx-auto flex-col w-11/12 items-center text-richblack-5 justify-between max-w-maxContent gap-10">
					<div className="text-center mx-auto flex flex-col gap-4 lg:w-[70%] py-20">
						<h2 className="font-semibold text-4xl font-inter">
							Driving Innovation in Online Education for a{" "}
							<HighlightText
								text={"Brighter Future"}
								gradient={
									"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
								}
							/>
						</h2>
						<p className="text-base font-medium text-richblack-300 lg:w-[95%]">
							Studynotion is at the forefront of driving
							innovation in online education. We're passionate
							about creating a brighter future by offering
							cutting-edge courses, leveraging emerging
							technologies, and nurturing a vibrant learning
							community.
						</p>
					</div>

					<div className="sm:h-[70px] lg:h-[150px]"></div>

					<div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
						<img src={aboutus1} alt="About us image 1" />
						<img src={aboutus2} alt="About us image 2" />
						<img src={aboutus3} alt="About us image 3" />
					</div>
				</div>
			</section>

			{/* Section 2 */}
			<div className="md:py-24 pb-14 mt-20 border-b border-richblack-700">
				<section className="flex flex-col w-11/12 mx-auto items-center text-richblack-5 justify-between max-w-maxContent">
					<div className="flex relative text-xl md:text-4xl text-center font-semibold">
						{/* <RiDoubleQuotesL className="absolute" /> */}
						<p>
							We are passionate about revolutionizing the way we
							learn. Our innovative platform{" "}
							<HighlightText
								text={"combines technology"}
								gradient={
									"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
								}
							/>
							,{" "}
							<HighlightText
								text={"expertise"}
								gradient={
									"bg-gradient-to-r from-[#FF512F] to-[#F09819]"
								}
							/>
							, and community to create an{" "}
							<HighlightText
								text={"unparalleled educational experience."}
								gradient={
									"bg-gradient-to-r from-[#E65C00] to-[#F9D423]"
								}
							/>
						</p>
						{/* <RiDoubleQuotesR className="absolute bottom-[10%] right-[10%]" /> */}
					</div>
				</section>
			</div>

			{/* Section 3 */}
			<section className="flex mx-auto flex-col w-11/12 items-center text-richblack-5 justify-around max-w-maxContent">
				{/* Founding Story */}
				<div className="flex flex-col items-center gap-10 lg:flex-row justify-between my-20">
					{/* Left Part */}
					<div className="flex flex-col lg:w-[50%] gap-y-6">
						<h2 className="font-semibold text-4xl font-inter">
							<HighlightText
								text={"Our Founding Story"}
								gradient={
									"bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
								}
							/>
						</h2>

						<div className="flex flex-col gap-y-4 lg:w-[95%]">
							<p className="text-base font-medium text-richblack-300">
								Our e-learning platform was born out of a shared
								vision and passion for transforming education.
								It all began with a group of educators,
								technologists, and lifelong learners who
								recognized the need for accessible, flexible,
								and high-quality learning opportunities in a
								rapidly evolving digital world.
							</p>

							<p className="text-base font-medium text-richblack-300">
								As experienced educators ourselves, we witnessed
								firsthand the limitations and challenges of
								traditional education systems. We believed that
								education should not be confined to the walls of
								a classroom or restricted by geographical
								boundaries. We envisioned a platform that could
								bridge these gaps and empower individuals from
								all walks of life to unlock their full
								potential.
							</p>
						</div>
					</div>

					{/* Right Part */}
					<div>
						<img
							src={FoundingStory}
							alt="Founding Story Image"
							className="shadow-[0_0_20px_0] shadow-[#FC6767]"
						/>
					</div>
				</div>

				{/* Vision and Mission */}
				<div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:py-20 pb-20">
					{/* left box */}
					<div className="flex flex-col gap-y-6 lg:w-[45%]">
						<h1 className="text-[36px] font-semibold leading-[44px] font-inter">
							<HighlightText
								text={"Our Vision"}
								gradient={
									"bg-gradient-to-r from-[#E65C00] to-[#F9D423]"
								}
							/>
						</h1>
						<p className="text-base font-medium text-richblack-300 lg:[95%]">
							With this vision in mind, we set out on a journey to
							create an e-learning platform that would
							revolutionize the way people learn. Our team of
							dedicated experts worked tirelessly to develop a
							robust and intuitive platform that combines
							cutting-edge technology with engaging content,
							fostering a dynamic and interactive learning
							experience.
						</p>
					</div>

					{/* right box */}
					<div className="flex flex-col gap-y-6 lg:w-[45%]">
						<h1 className="text-4xl font-semibold font-inter">
							<HighlightText
								text={"Our Mission"}
								gradient={
									"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
								}
							/>
						</h1>
						<p className="text-base font-medium text-richblack-300 lg:w-[95%]">
							Our mission goes beyond just delivering courses
							online. We wanted to create a vibrant community of
							learners, where individuals can connect,
							collaborate, and learn from one another. We believe
							that knowledge thrives in an environment of sharing
							and dialogue, and we foster this spirit of
							collaboration through forums, live sessions, and
							networking opportunities.
						</p>
					</div>
				</div>
			</section>

			{/* Section 4 */}
			<section className="bg-richblack-800 border-b border-richblack-700">
				<StatsComponent />
			</section>

			{/* Section 5 */}
			<section className="max-w-maxContent w-11/12 mx-auto items-center justify-center text-richblack-5 pt-20">
				{/* Learning Grid */}
				<LearningGrid />

				{/* Contact Us Form */}
				<div className="lg:w-[50%] md:w-[75%] mx-auto flex flex-col gap-10">
					<div>
						<h2 className="text-[36px] font-semibold leading-[44px] text-center">
							Get in Touch
						</h2>
						<p className="text-base font-medium text-richblack-300 text-center">
							We’d love to here for you, Please fill out this
							form.
						</p>
					</div>
					<ContactUsForm />
				</div>
			</section>

			{/* Section 6 */}
			<section className="flex flex-col gap-8 max-w-maxContent relative w-11/12 mx-auto items-center justify-between text-richblack-5 py-20">
				<h2 className="font-semibold text-4xl font-inter">
					Reviews From other learners
				</h2>
				{/* <ReviewSlider /> */}
			</section>

			<Footer />
		</div>
	);
};

export default About;
