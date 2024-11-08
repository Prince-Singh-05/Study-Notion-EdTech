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
					<Outlet />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
