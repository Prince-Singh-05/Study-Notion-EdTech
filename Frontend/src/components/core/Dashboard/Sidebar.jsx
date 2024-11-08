import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links.js";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink.jsx";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal.jsx";
import { logout } from "../../../services/operations/authAPI.js";

const Sidebar = () => {
	const { user, loading: profileLoading } = useSelector(
		(state) => state.profile
	);
	const { loading: authLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [confirmationModal, setConfirmationModal] = useState(null);

	return (
		<div className="text-richblack-5 w-56">
			{profileLoading || authLoading ? (
				<div className="spinner">Loading...</div>
			) : (
				<div className="flex min-w-[14rem] flex-col border-r border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-8 gap-y-2">
					<div className="flex flex-col">
						{sidebarLinks.map((link) => {
							if (link.type && user?.accountType !== link.type)
								return null;
							return <SidebarLink key={link.id} link={link} />;
						})}
					</div>

					<div className="py-1 px-4">
						<div className="mx-auto border border-richblack-600"></div>
					</div>

					<div className="flex flex-col">
						<SidebarLink
							link={{
								name: "Setting",
								path: "/dashboard/settings",
								icon: "VscSettings",
							}}
						/>

						<button
							onClick={() =>
								setConfirmationModal({
									text1: "Are You Sure ?",
									text2: "You will be logged out of your Account",
									btn1Text: "Logout",
									btn2Text: "Cancel",
									btn1Handler: () =>
										dispatch(logout(navigate)),
									btn2Handler: () =>
										setConfirmationModal(null),
								})
							}
							className="text-sm font-medium text-richblack-300"
						>
							<div className="flex items-center py-2 px-6 gap-x-3">
								<VscSignOut className="text-lg" />
								<span>Logout</span>
							</div>
						</button>
					</div>

					{confirmationModal && (
						<ConfirmationModal modalData={confirmationModal} />
					)}
				</div>
			)}
		</div>
	);
};

export default Sidebar;
