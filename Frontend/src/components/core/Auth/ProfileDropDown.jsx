import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLogout, MdSpaceDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropDown = () => {
	const { user } = useSelector((state) => state.profile);
	const profileRef = useRef(null);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useOnClickOutside(profileRef, () => setOpen(false));

	if (!user) return null;

	return (
		<div className="relative">
			<button
				onClick={() => setOpen(true)}
				ref={profileRef}
				className="flex items-center"
			>
				<img
					src={user?.image}
					alt="Profile Picture"
					className="w-[30px] h-[30px] rounded-full aspect-square object-cover"
				/>
			</button>

			{open && (
				<div
					className="absolute top-[118%] right-0 z-[100] divide-richblack-700 border-richblack-700 overflow-hidden rounded-md border bg-richblack-800"
					onClick={(e) => e.stopPropagation()}
				>
					<Link
						to={"/dashboard/my-profile"}
						// onClick={() => setOpen(false)}
					>
						<div className="flex gap-1 w-full items-center border-b-[1px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 px-[12px] py-[10px]">
							<MdSpaceDashboard />
							<p>Dashboard</p>
						</div>
					</Link>

					<button
						onClick={() => {
							dispatch(logout(navigate));
							// setOpen(false);
						}}
						className="flex gap-1 w-full items-center text-sm cursor-pointer text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 px-[12px] py-[10px]"
					>
						<MdOutlineLogout />
						<p>Logout</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileDropDown;
