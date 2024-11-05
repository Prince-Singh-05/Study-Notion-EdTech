import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector";
import CountryCode from "../../../data/countrycode.json";

const ContactUsForm = () => {
	const [loading, setLoading] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			resetCart({
				email: "",
				firstName: "",
				lastName: "",
				message: "",
				phoneNo: "",
			});
		}
	}, [reset, isSubmitSuccessful]);

	const submitForm = async (data) => {
		try {
			setLoading(true);
			// const response = apiConnector()
			const response = { statsu: "OK", data };
			console.log("Contact Us Form Response: ", response);
			setLoading(false);
		} catch (error) {
			console.log("Errors", error.message);
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className="flex flex-col gap-y-4"
		>
			<div className="flex gap-x-4">
				{/* First Name */}
				<div className="flex flex-col gap-y-2 flex-1">
					<label
						htmlFor="firstName"
						className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
					>
						First Name <sup className="text-pink-200">*</sup>
					</label>
					<input
						id="firstName"
						type="text"
						name="firstName"
						placeholder="Enter your first name"
						{...register("firstName", { required: true })}
						style={{
							boxShadow:
								"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
						}}
						className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
					/>
					{errors.firstName && <span>Please Enter Your Name</span>}
				</div>

				{/* Last Name */}
				<div className="flex flex-col gap-y-2 flex-1">
					<label
						htmlFor="lastName"
						className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
					>
						Last Name
					</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						placeholder="Enter your last name"
						{...register("lastName")}
						style={{
							boxShadow:
								"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
						}}
						className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
					/>
				</div>
			</div>

			{/* Email */}
			<div className="flex flex-col gap-y-2">
				<label
					htmlFor="email"
					className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
				>
					Email Address <sup className="text-pink-200">*</sup>
				</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Enter your email address"
					{...register("email", { required: true })}
					style={{
						boxShadow:
							"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
					}}
					className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
				/>
				{errors.email && <span>Please enter your email address</span>}
			</div>

			{/* Phone Number */}
			<div className="flex flex-col gap-y-2">
				<label
					htmlFor="phoneNo"
					className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
				>
					Phone Number <sup className="text-pink-200">*</sup>
				</label>
				<div className="flex gap-x-4">
					{/* Country Code Dropdown */}
					<select
						name="countryCode"
						id="countryCode"
						defaultValue="+91"
						{...register("countryCode", { required: true })}
						style={{
							boxShadow:
								"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
						}}
						className="w-[15%] rounded-[0.5rem] bg-richblack-800 py-3 pl-2 pr-1 text-richblack-5"
					>
						{CountryCode.map((element, index) => {
							return (
								<option key={index} value={element.code}>
									{element.code}-{element.country}
								</option>
							);
						})}
					</select>

					<input
						id="phoneNo"
						type="tel"
						name="phoneNo"
						placeholder="12345 67890"
						{...register("phoneNo", {
							required: {
								value: true,
								message: "Enter your phone number",
							},
							maxLength: {
								value: 10,
								message: "Invalid Phone Number",
							},
							minLength: {
								value: 10,
								message: "Invalid Phone Number",
							},
						})}
						style={{
							boxShadow:
								"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
						}}
						className="w-[80%] flex-1 rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
					/>
				</div>
				{errors.phoneNo && <span>{errors.phoneNo?.message}</span>}
			</div>

			{/* Message Box */}
			<div className="flex flex-col gap-y-2">
				<label
					htmlFor="message"
					className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
				>
					Message <sup className="text-pink-200">*</sup>
				</label>
				<textarea
					id="message"
					name="message"
					cols={30}
					rows={5}
					placeholder="Enter your message here...."
					{...register("message", { required: true })}
					style={{
						boxShadow:
							"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
					}}
					className="w-full rounded-[0.5rem] bg-richblack-800 p-3 text-richblack-5"
				/>
				{errors.message && <span>Please enter your message.</span>}
			</div>

			<button
				type="submit"
				className="mt-6 rounded-[8px] bg-yellow-50 py-2 px-3 font-medium text-richblack-900"
			>
				Send Message
			</button>
		</form>
	);
};

export default ContactUsForm;
