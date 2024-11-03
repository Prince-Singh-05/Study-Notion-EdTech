import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { resetPasswordToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
	const [emailSent, setEmailSent] = useState(false);
	const { loading } = useSelector((state) => state.auth);
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPasswordToken(email, setEmailSent));
	};

	return (
		<div className="w-full flex flex-1 justify-center items-center text-richblack-25">
			{loading ? (
				<div className="spinner">Loading...</div>
			) : (
				<div className="max-w-[508px] p-8 gap-y-6 flex flex-col">
					<h2 className="font-semibold text-3xl">
						{!emailSent ? "Reset Your Password" : "Check Email"}
					</h2>
					<p className="text-richblack-100 text-lg">
						{!emailSent
							? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
							: `We have sent the reset email to ${email}`}
					</p>
					<form
						onSubmit={handleOnSubmit}
						className="flex w-full flex-col gap-y-6"
					>
						{!emailSent && (
							<label className="w-full">
								<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
									Email Address{" "}
									<sup className="text-pink-200">*</sup>
								</p>
								<input
									required
									type="text"
									name="email"
									value={email}
									placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
									style={{
										boxShadow:
											"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
									}}
									className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
								/>
							</label>
						)}

						<button
							type="submit"
							className="rounded-[8px] bg-yellow-50 py-2 px-3 font-medium text-richblack-900"
						>
							{!emailSent ? "Reset Password" : "Resend Email"}
						</button>
					</form>

					<Link to={"/login"} className="flex gap-x-2 items-center">
						<HiOutlineArrowNarrowLeft />
						<p>Back to login</p>
					</Link>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
