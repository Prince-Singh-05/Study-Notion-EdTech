import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";

const MyProfile = () => {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	console.log("User details", user);

	return (
		<div className="text-richblack-5 flex flex-col justify-center p-6 gap-y-6">
			<h1 className="font-semibold text-3xl">My Profile</h1>
			<div className="lg:w-[75%] flex flex-col gap-y-10 lg:pl-24 transition-all duration-1000">
				{/* Section 1 */}
				<div className="flex bg-richblack-800 border border-richblack-700 justify-between p-6 items-center rounded-lg">
					<div className="flex gap-x-4 items-center">
						<img
							src={user?.image}
							alt={`Profile-${user?.firstName}`}
							className="aspect-square w-[4.875rem] rounded-full object-cover"
						/>
						<div className="flex flex-col gap-y-3">
							<p className="font-semibold text-lg">
								{user?.firstName + " " + user?.lastName}
							</p>
							<p className="font-medium text-base text-richblack-300">
								{user?.email}
							</p>
						</div>
					</div>
					<IconButton
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					/>
				</div>

				{/* Section 2 */}
				<div className="flex flex-col bg-richblack-800 border border-richblack-700 p-6 rounded-lg gap-y-2">
					<div className="flex justify-between">
						<p className="font-semibold text-lg">About</p>
						<IconButton
							text="Edit"
							onclick={() => {
								navigate("/dashboard/settings");
							}}
						/>
					</div>
					<p className="font-medium text-base text-richblack-300">
						{user?.additionalDetails?.about ??
							"Write Something About Yourself"}
					</p>
				</div>

				{/* Section 3 */}
				<div className="flex flex-col bg-richblack-800 border border-richblack-700 p-6 rounded-lg gap-y-2">
					<div className="flex justify-between">
						<p className="font-semibold text-lg">
							Personal Details
						</p>
						<IconButton
							text="Edit"
							onclick={() => {
								navigate("/dashboard/settings");
							}}
						/>
					</div>

					<div className="grid lg:grid-cols-2 grid-cols-1 gap-y-3">
						<div>
							<p className="font-medium text-richblack-300">
								First Name
							</p>
							<p>{user?.firstName}</p>
						</div>

						<div>
							<p className="font-medium text-richblack-300">
								Last Name
							</p>
							<p>{user?.lastName}</p>
						</div>

						<div>
							<p className="font-medium text-richblack-300">
								Email
							</p>
							<p>{user?.email}</p>
						</div>

						<div>
							<p className="font-medium text-richblack-300">
								Phone Number
							</p>
							<p>
								{user?.additionalDetails?.contactNumber ??
									"Add Contact Number"}
							</p>
						</div>

						<div>
							<p className="font-medium text-richblack-300">
								Gender
							</p>
							<p>
								{user?.additionalDetails?.gender ??
									"Add your gender"}
							</p>
						</div>

						<div>
							<p className="font-medium text-richblack-300">
								Date of Birth
							</p>
							<p>
								{user?.additionalDetails?.dateOfBirth ??
									"Add Date of Birth"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
