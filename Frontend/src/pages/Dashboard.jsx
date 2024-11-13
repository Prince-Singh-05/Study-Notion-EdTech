import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
	const { loading: authLoading } = useSelector((state) => state.auth);
	const { loading: profileLoading } = useSelector((state) => state.profile);

	return (
		<div>
			{authLoading || profileLoading ? (
				<div className="spinner">Loading...</div>
			) : (
				<div className="flex h-full">
					<Sidebar />
					<div className="mt-14 flex-1 lg:ml-[14rem]">
						<Outlet />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
