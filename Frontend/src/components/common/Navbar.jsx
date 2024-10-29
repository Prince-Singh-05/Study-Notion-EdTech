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

const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const [subLinks, setSubLinks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchSubLinks = async () => {
		setIsLoading(true);
		try {
			const result = await apiConnector("GET", categories.CATEGORIES_API);
			const data = result?.data?.data;
			setSubLinks([...data]);
			setIsLoading(false);
		} catch (error) {
			console.log("Could not fetch the catalog list", error);
		}
	};

	useEffect(() => {
		fetchSubLinks();
	}, []);

	return (
		<div className="w-full flex h-14 items-center border-b border-richblack-700">
			<div className="flex w-11/12 max-w-maxContent mx-auto items-center justify-between">
				{/* Logo */}
				<Link to={"/signup"}>
					<img src={logo} width={160} height={32} />
				</Link>

				{/* Nav Links */}
				<nav>
					<ul className="flex gap-x-6 text-richblack-25">
						{NavbarLinks.map((link, index) => {
							return (
								<li key={index}>
									{link.title === "Catalog" ? (
										<div className="relative flex group">
											<div className="flex items-center gap-2 cursor-pointer">
												<p>{link.title}</p>
												<IoIosArrowDown />
											</div>
											<div className="lg:w-[300px] lg:h-fit bg-richblack-5 rounded-lg lg:p-4 z-10 absolute hidden opacity-0 top-[50%] left-[50%] translate-y-[12%] translate-x-[-50%] group-hover:block group-hover:opacity-100 transition-all duration-200">
												<div className="w-6 h-6 bg-richblack-5 rounded-sm -z-10 absolute -top-[5%] left-[50%] translate-x-[90%] rotate-45"></div>
												{isLoading ? (
													<div className="text-richblack-500 capitalize py-4 px-3">
														Loading...
													</div>
												) : (
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
																	<p className="text-richblack-900 capitalize p-4 rounded-lg hover:bg-richblack-50">
																		{
																			subLink.name
																		}
																	</p>
																</Link>
															)
														)}
													</div>
												)}
											</div>
										</div>
									) : (
										<NavLink
											to={link?.path}
											className={({ isActive }) =>
												isActive
													? "text-yellow-100"
													: "text-white"
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
				<div className="flex gap-x-4 items-center">
					{user && user.accountType !== "instructor" ? (
						<Link to={"/dashboard/cart"} className="relative">
							<GrCart />
							{totalItems > 0 && <div>{totalItems}</div>}
						</Link>
					) : (
						<div>
							<IoSearchSharp />
						</div>
					)}
					{token !== null ? (
						<ProfileDropDown />
					) : (
						<div className="flex justify-between gap-4">
							<Link to={"/login"}>
								<button
									className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md"
									// title="Please Login here"
								>
									Login
								</button>
							</Link>
							<Link to={"/signup"}>
								<button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
									Signup
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
