import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {
	PiFacebookLogoFill,
	PiGoogleLogoFill,
	PiTwitterLogoFill,
	PiYoutubeLogoFill,
} from "react-icons/pi";
import { FooterLinks } from "../../data/footer-links";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="text-richblack-600 border-t bg-richblack-800 text-sm">
			<div className="lg:w-11/12 max-w-maxContent w-full flex flex-col gap-4 py-4 px-2 mx-auto lg:py-[52px]">
				<div className="flex md:flex-row flex-col gap-8 md:gap-4 justify-between">
					<div className="md:w-[48%] flex justify-between flex-wrap">
						{/* Company */}
						<div className="flex flex-col gap-2 mb-32">
							<img
								src={Logo}
								alt="Logo full light"
								loading="lazy"
								className="text-richblack-100 w-[160px] h-[32px]"
							/>
							<ul className="flex flex-col gap-2">
								<li className="font-semibold text-richblack-100">
									Company
								</li>
								<li>About</li>
								<li>Careers</li>
								<li>Affilliates</li>
							</ul>
							<div className="flex gap-3">
								<PiFacebookLogoFill className="w-[24px] h-[24px]" />
								<PiGoogleLogoFill className="w-[24px] h-[24px]" />
								<PiTwitterLogoFill className="w-[24px] h-[24px]" />
								<PiYoutubeLogoFill className="w-[24px] h-[24px]" />
							</div>
						</div>

						{/* Resources and Support */}
						<div>
							<div className="mb-8">
								<ul className="flex flex-col gap-2">
									<li className="font-semibold text-richblack-100">
										Resources
									</li>
									<li>Articles</li>
									<li>Blog</li>
									<li>Chart Sheet</li>
									<li>Code Challengers</li>
									<li>Docs</li>
									<li>Projects</li>
									<li>Videos</li>
									<li>Workspaces</li>
								</ul>
							</div>

							<div>
								<ul className="flex flex-col gap-2">
									<li className="font-semibold text-richblack-100">
										Support
									</li>
									<li>Help Center</li>
								</ul>
							</div>
						</div>

						{/* Plans and Community */}
						<div className="sm:flex-col flex flex-row gap-8">
							<div className="">
								<ul className="flex flex-col gap-2">
									<li className="text-richblack-100 font-semibold">
										Plans
									</li>
									<li>Paid memberships</li>
									<li>For students</li>
									<li>Business solutions</li>
								</ul>
							</div>

							<div className="">
								<ul className="flex flex-col gap-2">
									<li className="text-richblack-100 font-semibold">
										Community
									</li>
									<li>Forums</li>
									<li>Chapters</li>
									<li>Events</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="w-[1px] bg-richblack-700"></div>

					<div className="md:w-[48%] flex md:justify-between justify-around flex-wrap">
						<div>
							<ul className="flex flex-col gap-2">
								<li className="text-richblack-100 font-semibold">
									{FooterLinks[0].title}
								</li>
								{FooterLinks[0].links.map((link, index) => (
									<Link to={link.link} key={index}>
										<li>{link.title}</li>
									</Link>
								))}
							</ul>
						</div>

						<div>
							<ul className="flex flex-col gap-2">
								<li className="text-richblack-100 font-semibold">
									{FooterLinks[1].title}
								</li>
								{FooterLinks[1].links.map((link, index) => (
									<Link to={link.link} key={index}>
										<li>{link.title}</li>
									</Link>
								))}
							</ul>
						</div>

						<div>
							<ul className="flex flex-col gap-2">
								<li className="text-richblack-100 font-semibold">
									{FooterLinks[2].title}
								</li>
								{FooterLinks[2].links.map((link, index) => (
									<Link to={link.link} key={index}>
										<li>{link.title}</li>
									</Link>
								))}
							</ul>
						</div>
					</div>
				</div>

				<hr className="w-full mx-auto" />

				<div className="flex sm:flex-row flex-col justify-between items-center">
					<div className="flex gap-1 items-center">
						<div>Privacy Policy</div>
						<hr className="rotate-90 w-3" />
						<div>Cookie Policy</div>
						<hr className="rotate-90 w-3" />
						<div>Terms</div>
					</div>
					<div>
						Made with{" "}
						<span className="text-pink-500 text-lg">♥</span> by
						Prince SIngh © 2024 StudyNotion
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
