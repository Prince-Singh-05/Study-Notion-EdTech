import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/settingsAPI";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import IconButton from "../../../common/IconButton";

const UpdatePassword = () => {
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitPasswordForm = async (data) => {
		try {
			await changePassword(token, data);
		} catch (error) {
			console.log("ERROR MESSAGE - ", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(submitPasswordForm)}>
			<div className="my-6 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-900 p-8 px-12">
				<h2 className="text-lg font-semibold text-richblack-5">
					Password
				</h2>
				<div className="flex flex-col flex-wrap gap-5 lg:flex-row">
					<label className="relative flex-grow">
						<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
							Current Password{" "}
							<sup className="text-pink-200">*</sup>
						</p>
						<input
							type={showOldPassword ? "text" : "password"}
							name="oldPassword"
							placeholder="Enter Current Password"
							style={{
								boxShadow:
									"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
							}}
							className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
							{...register("oldPassword", { required: true })}
						/>
						<span
							onClick={() => setShowOldPassword((prev) => !prev)}
							className="absolute right-3 top-[38px] z-10 cursor-pointer"
						>
							{showOldPassword ? (
								<AiOutlineEyeInvisible
									fontSize={24}
									fill="#AFB2BF"
								/>
							) : (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>

					<label className="relative flex-grow">
						<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
							New Password <sup className="text-pink-200">*</sup>
						</p>
						<input
							type={showNewPassword ? "text" : "password"}
							name="newPassword"
							placeholder="Enter New Password"
							style={{
								boxShadow:
									"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
							}}
							className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
							{...register("newPassword", { required: true })}
						/>
						<span
							onClick={() => setShowNewPassword((prev) => !prev)}
							className="absolute right-3 top-[38px] z-10 cursor-pointer"
						>
							{showNewPassword ? (
								<AiOutlineEyeInvisible
									fontSize={24}
									fill="#AFB2BF"
								/>
							) : (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>

					<label className="relative flex-grow">
						<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
							Confirm New Password{" "}
							<sup className="text-pink-200">*</sup>
						</p>
						<input
							type={showConfirmNewPassword ? "text" : "password"}
							name="confirmNewPassword"
							placeholder="Confirm New Password"
							style={{
								boxShadow:
									"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
							}}
							className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
							{...register("confirmNewPassword", {
								required: true,
							})}
						/>
						<span
							onClick={() =>
								setShowConfirmNewPassword((prev) => !prev)
							}
							className="absolute right-3 top-[38px] z-10 cursor-pointer"
						>
							{showConfirmNewPassword ? (
								<AiOutlineEyeInvisible
									fontSize={24}
									fill="#AFB2BF"
								/>
							) : (
								<AiOutlineEye fontSize={24} fill="#AFB2BF" />
							)}
						</span>
					</label>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					onClick={() => {
						navigate("/dashboard/my-profile");
					}}
					className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
				>
					Cancel
				</button>
				<IconButton type="submit" text="Update" />
			</div>
		</form>
	);
};

export default UpdatePassword;
