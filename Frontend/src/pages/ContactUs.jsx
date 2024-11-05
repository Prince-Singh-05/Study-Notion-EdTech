import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAsia } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import ContactUsForm from "../components/core/ContactUsPage/ContactUsForm";
import Footer from "../components/common/Footer";

const ContactUs = () => {
	return (
		<div>
			{/* Section 1 */}
			<section className="flex relative mx-auto lg:w-11/12 text-white justify-around max-w-maxContent py-24 gap-x-12">
				{/* Left Part */}
				<div className="flex flex-col gap-y-6 w-[40%] p-6 rounded-xl bg-richblack-800 max-h-fit">
					{/* Chat with us */}
					<div className="flex gap-x-2 items-start p-3">
						<HiChatBubbleLeftRight
							fontSize={24}
							className="text-richblack-200"
						/>
						<div className="flex flex-col gap-y-1">
							<h2 className="font-semibold text-lg font-inter">
								Chat with us
							</h2>
							<p className="text-sm font-medium text-richblack-200">
								Our friendly team is here to help.
							</p>
							<p className="text-sm font-medium text-richblack-200">
								@studynotion.support@gmail.com
							</p>
						</div>
					</div>

					{/* Visit us */}
					<div className="flex gap-x-2 items-start p-3">
						<FaGlobeAsia
							fontSize={24}
							className="text-richblack-200"
						/>
						<div className="flex flex-col gap-y-1">
							<h2 className="font-semibold text-lg font-inter">
								Visit us
							</h2>
							<p className="text-sm font-medium text-richblack-200">
								Come and say hello at our office HQ.
							</p>
							<p className="text-sm font-medium text-richblack-200">
								Here is the location/ address
							</p>
						</div>
					</div>

					{/* Call us */}
					<div className="flex gap-x-2 items-start p-3">
						<MdCall fontSize={24} className="text-richblack-200" />
						<div className="flex flex-col gap-y-1">
							<h2 className="font-semibold text-lg font-inter">
								Call us
							</h2>
							<p className="text-sm font-medium text-richblack-200">
								Mon - Fri From 8am to 5pm
							</p>
							<p className="text-sm font-medium text-richblack-200">
								+123 456 7890
							</p>
						</div>
					</div>
				</div>

				{/* Right Part */}
				<div className="flex flex-col w-[60%] border border-richblack-600 p-12 rounded-xl gap-y-8">
					<div>
						<h2 className="text-[36px] font-semibold leading-[44px] font-inter">
							Got a Idea? We’ve got the skills. Let’s team up
						</h2>
						<p className="text-base font-medium text-richblack-300">
							Tall us more about yourself and what you’re got in
							mind.
						</p>
					</div>
					<ContactUsForm />
				</div>
			</section>

			{/* Section 2 */}
			<section className="max-w-maxContent lg:w-11/12 mx-auto items-center justify-center text-richblack-5 py-20">
				<div className="flex flex-col text-center">
					<h2 className="font-semibold text-[36px] leading-[44px] font-inter">
						Reviews From other learners
					</h2>
					{/* <ReviewSlider /> */}
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default ContactUs;
