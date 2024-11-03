import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { FaRedoAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { sendotp, signup } from "../services/operations/authAPI";

const VerifyEmail = () => {
	const { signupData, loading } = useSelector((state) => state.auth);
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!signupData) {
			navigate("/signup");
		}
	}, []);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const {
			accountType,
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		} = signupData;

		dispatch(
			signup(
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				accountType,
				otp,
				navigate
			)
		);
	};

	return (
		<div className="w-full flex flex-1 justify-center items-center text-richblack-25">
			{loading ? (
				<div className="spinner">Loading...</div>
			) : (
				<div className="max-w-[508px] p-8 gap-y-6 flex flex-col">
					<h2 className="font-semibold text-3xl">Verify Email</h2>
					<p className="text-richblack-100 text-lg">
						A verification code has been sent to you. Enter the code
						below
					</p>

					<form
						onSubmit={handleOnSubmit}
						className="flex w-full flex-col gap-y-6"
					>
						<OtpInput
							numInputs={6}
							value={otp}
							onChange={setOtp}
							renderInput={(props) => (
								<input
									{...props}
									placeholder="-"
									className="w-full rounded-[0.4rem] bg-richblack-800 py-3 flex-1 text-richblack-5 border-0 outline-1 outline-yellow-50"
								/>
							)}
							shouldAutoFocus
							inputType="tel"
							containerStyle={
								"w-full flex gap-x-4 outline-0 border-0"
							}
						/>

						<button
							type="submit"
							className="rounded-[8px] bg-yellow-50 py-2 px-3 font-medium text-richblack-900"
						>
							Verify Email
						</button>
					</form>

					<div className="flex justify-between">
						<Link
							to={"/login"}
							className="flex gap-x-2 items-center"
						>
							<HiOutlineArrowNarrowLeft />
							<p>Back to login</p>
						</Link>

						<button
							onClick={() => dispatch(sendotp(signupData.email))}
							className="flex gap-x-2 items-center text-blue-100"
						>
							<FaRedoAlt />
							Resend it
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default VerifyEmail;
