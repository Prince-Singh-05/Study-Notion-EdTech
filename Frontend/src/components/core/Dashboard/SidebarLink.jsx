import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch, useNavigate } from "react-redux";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link }) => {
	const Icon = Icons[link.icon];
	const diapatch = useDispatch();
	const navigate = useNavigate();

	return (
		<NavLink
			to={link.path}
			className={`${
				active
					? "bg-yellow-800 border-l-2 border-yellow-50 text-yellow-50"
					: "bg-transparent text-richblack-300"
			} flex py-2 px-6 gap-x-3`}
		>
			<Icon className="md:w-[1rem] md:h-[1rem] w-[2rem] h-[2rem]" />
			<p className="font-medium text-sm">{link.name}</p>
		</NavLink>
	);
};

export default SidebarLink;
