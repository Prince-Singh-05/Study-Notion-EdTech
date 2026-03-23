import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links.js";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown.jsx";
import { GrCart } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from "../../services/apis.js";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { ACCOUNT_TYPE } from "../../utils/constants.js";

const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const [subLinks, setSubLinks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [mobileMenuActive, setMobileMenuActive] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const result = await apiConnector(
					"GET",
					categories.CATEGORIES_API
				);
				const data = result?.data?.data;
				setSubLinks([...data]);
				setIsLoading(false);
			} catch (error) {
				console.log("Could not fetch the catalog list", error);
			}
		})();
	}, []);

	return (
		<>
			<div className="w-full flex h-14 items-center border-b border-richblack-700 bg-richblack-900 fixed top-0 z-10">
				<div className="flex w-11/12 max-w-maxContent mx-auto items-center justify-between">
					{/* Logo */}
					<Link to={"/"}>
						<img
							src={logo}
							alt="logo"
							width={160}
							height={32}
							loading="lazy"
						/>
					</Link>

					{/* Nav Links */}
					<nav className="hidden md:block">
						<ul className="flex gap-x-6 text-richblack-25">
							{NavbarLinks.map((link, index) => {
								return (
									<li key={index}>
										{link.title === "Catalog" ? (
											<div className="relative group">
												<div className="flex items-center gap-2 cursor-pointer">
													<p>{link.title}</p>
													<IoIosArrowDown />
												</div>
												<div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
													<div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
													{isLoading ? (
														<div className="text-center">
															Loading...
														</div>
													) : subLinks.length ? (
														<div>
															{subLinks.map(
																(
																	subLink,
																	index
																) => (
																	<Link
																		to={`/catalog/${subLink.name}`}
																		key={
																			index
																		}
																	>
																		<p className="text-richblack-900 capitalize p-4 rounded-lg bg-transparent hover:bg-richblack-50">
																			{
																				subLink.name
																			}
																		</p>
																	</Link>
																)
															)}
														</div>
													) : (
														<p className="text-center">
															No Courses Found
														</p>
													)}
												</div>
											</div>
										) : (
											<NavLink
												to={link?.path}
												className={({ isActive }) =>
													isActive
														? "text-yellow-100"
														: "text-richblack-25"
												}
											>
												<p
													className={`hover:text-richblack-300`}
												>
													{link?.title}
												</p>
											</NavLink>
										)}
									</li>
								);
							})}
						</ul>
					</nav>

					{/* login/signup/dashboard */}
					<div className="hidden items-center gap-x-4 md:flex">
						{user &&
						user.accountType !== ACCOUNT_TYPE.INSTRUCTOR ? (
							<div className="flex gap-x-4 items-center">
								<div className="w-[25px] h-[25px]">
									<IoSearchSharp className="text-richblack-100 text-2xl cursor-pointer" />
								</div>
								<Link
									to={"/dashboard/cart"}
									className="relative"
								>
									<GrCart className="text-2xl text-richblack-100" />
									{totalItems > 0 && (
										<div className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
											{totalItems}
										</div>
									)}
								</Link>
							</div>
						) : (
							<div className="w-[25px] h-[25px]">
								<IoSearchSharp className="text-white text-2xl cursor-pointer" />
							</div>
						)}
						{token !== null ? (
							<ProfileDropDown />
						) : (
							<div className="flex justify-between gap-4">
								<Link to={"/login"}>
									<button
										className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
										// title="Please Login here"
									>
										Login
									</button>
								</Link>
								<Link to={"/signup"}>
									<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
										Signup
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

			<button
				className="mr-4 md:hidden absolute right-2 top-4 z-[100]"
				onClick={() => setMobileMenuActive(!mobileMenuActive)}
			>
				{!mobileMenuActive ? (
					<AiOutlineMenu fontSize={24} fill="#AFB2BF" />
				) : (
					<RxCross2 fontSize={24} fill="#AFB2BF" />
				)}
			</button>

			{/* Mobile Menu */}
			{mobileMenuActive && (
				<div>
					<div
						className="bg-richblack-25 opacity-75 flex w-screen h-screen fixed z-40"
						onClick={() => setMobileMenuActive(false)}
					></div>
					<div className="bg-richblack-500 opacity-95 flex w-48 md:w-64 h-screen fixed right-0 z-50">
						<div className="flex flex-col w-full gap-4 px-2">
							<div className="w-full h-14 bg-transparent border-b-2 border-richblack-800"></div>
							{NavbarLinks.map((link, index) => (
								<div key={index}>
									{link.title === "Catalog" ? (
										<div className="relative group">
											<div className="flex items-center gap-2 cursor-pointer">
												<p>{link.title}</p>
												<IoIosArrowDown />
											</div>
											<div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
												<div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
												{isLoading ? (
													<div className="text-center">
														Loading...
													</div>
												) : subLinks.length ? (
													<div>
														{subLinks.map(
															(
																subLink,
																index
															) => (
																<Link
																	to={`/catalog/${subLink.name}`}
																	key={index}
																>
																	<p className="text-richblack-900 capitalize p-4 rounded-lg bg-transparent hover:bg-richblack-50">
																		{
																			subLink.name
																		}
																	</p>
																</Link>
															)
														)}
													</div>
												) : (
													<p className="text-center">
														No Courses Found
													</p>
												)}
											</div>
										</div>
									) : (
										<NavLink
											to={link?.path}
											className={({ isActive }) =>
												isActive
													? "text-yellow-100"
													: "text-richblack-25"
											}
										>
											<p
												className={`hover:text-richblack-300`}
											>
												{link?.title}
											</p>
										</NavLink>
									)}
								</div>
							))}

							<div className="flex flex-col justify-between gap-3">
								<Link to={"/login"}>
									<button
										className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
										// title="Please Login here"
									>
										Login
									</button>
								</Link>
								<Link to={"/signup"}>
									<button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
										Signup
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
