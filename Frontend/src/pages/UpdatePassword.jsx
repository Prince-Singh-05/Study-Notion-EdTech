import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import PasswordChecklist from "react-password-checklist";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
	const [resetPending, setResetPending] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const { email, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();

	const { password, confirmPassword } = formData;

	const handleOnChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const token = location?.pathname.split("/").at(-1);
		dispatch(
			resetPassword(password, confirmPassword, token, setResetPending)
		);
	};

	return (
		<div className="w-full flex flex-1 justify-center items-center text-richblack-25">
			{loading ? (
				<div className="spinner">Loading...</div>
			) : (
				<div className="max-w-[508px] p-8 gap-y-6 flex flex-col">
					<h2 className="font-semibold text-3xl">
						{resetPending
							? "Choose New Passsword"
							: "Reset Complete"}
					</h2>

					<p className="text-richblack-100 text-lg">
						{resetPending
							? "Almost done. Enter your new password and your are all set."
							: `All done! We have sent an email to ${email} to confirm`}
					</p>

					<form
						onSubmit={handleOnSubmit}
						className="flex w-full flex-col gap-y-6"
					>
						{resetPending && (
							<div className="flex w-full flex-col gap-y-4">
								<label className="w-full relative">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
										New Password{" "}
										<sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type={
											showPassword ? "text" : "password"
										}
										name="password"
										value={password}
										placeholder="Enter New Password"
										onChange={handleOnChange}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
									/>
									<span
										onClick={() =>
											setShowPassword((prev) => !prev)
										}
										className="absolute right-3 top-[38px] z-10 cursor-pointer"
									>
										{showPassword ? (
											<AiOutlineEyeInvisible
												fontSize={24}
												fill="#AFB2BF"
											/>
										) : (
											<AiOutlineEye
												fontSize={24}
												fill="#AFB2BF"
											/>
										)}
									</span>
								</label>

								<label className="w-full relative">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
										Confirm New Password{" "}
										<sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										name="confirmPassword"
										value={confirmPassword}
										placeholder="Confirm New Password"
										onChange={handleOnChange}
										style={{
											boxShadow:
												"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
									/>
									<span
										onClick={() =>
											setShowConfirmPassword(
												(prev) => !prev
											)
										}
										className="absolute right-3 top-[38px] z-10 cursor-pointer"
									>
										{showConfirmPassword ? (
											<AiOutlineEyeInvisible
												fontSize={24}
												fill="#AFB2BF"
											/>
										) : (
											<AiOutlineEye
												fontSize={24}
												fill="#AFB2BF"
											/>
										)}
									</span>
								</label>

								<PasswordChecklist
									rules={[
										"lowercase",
										"specialChar",
										"capital",
										"minLength",
										"number",
										"match",
										"noSpaces",
									]}
									minLength={8}
									value={password}
									valueAgain={confirmPassword}
									// onChange={(isValid) => {}}
									messages={{
										minLength: "8 character minimum",
										lowercase: "One lowercase character",
										capital: "One uppercase character",
										specialChar: "One special character",
										number: "One number",
									}}
									className="grid grid-cols-2 text-[14px]"
									iconSize={10}
								/>
							</div>
						)}

						<button
							type="submit"
							className="rounded-[8px] bg-yellow-50 py-2 px-3 font-medium text-richblack-900"
						>
							{resetPending
								? "Reset Password"
								: "Return to Login"}
						</button>
					</form>

					{resetPending && (
						<Link
							to={"/login"}
							className="flex gap-x-2 items-center"
						>
							<HiOutlineArrowNarrowLeft />
							<p>Back to login</p>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default UpdatePassword;
