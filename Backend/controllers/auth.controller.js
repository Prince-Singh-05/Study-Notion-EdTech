import User from "../models/user.model";
import OTP from "../models/otp.model";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import Profile from "../models/profile.model";
import sendMAIL from "../utils/nodemailer";

// send otp
const sendOTP = async (req, res) => {
	try {
		// get email  from request's body
		const { email } = req.body; // pending - zod validation for email and req.body

		// check if user registered with this email & email validation
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not registered with this email",
			});
		}

		// if user exists, generate an unique OTP
		let otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
			lowerCaseAlphabets: false,
		});

		const prevOTP = await OTP.findOne({ email });

		// it is a bad approach to check for an unique otp -> try to add some services which generate unique otp each time
		while (otp === prevOTP) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
				specialChars: false,
				lowerCaseAlphabets: false,
			});

			// prevOTP = await OTP.findOne({ email });
		}

		// store this OTP in DB
		await OTP.findOneAndUpdate(
			{ email },
			{
				otp,
			},
			{ new: true }
		);

		// return response
		res.status(200).json({
			success: true,
			message: "OTP sent successfully!",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while sending OTP for signup",
		});
	}
};

// signup
const signup = async (req, res) => {
	try {
		// get data from request's body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

		// data validation, and check if user already exists with given email
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			res.status(401).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				success: false,
				message: "User already registered from this email",
			});
		}

		// if no user exists, check if password and confirmPassword fields match or not
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and confirm Password does not match",
			});
		}

		// get recentOTP from DB, validate OTP
		const recentOTP = await OTP.findOne({ email })
			.sort({ createdAt: -1 })
			.limit(1);

		if (otp !== recentOTP.otp) {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 8);

		// create a new entry in DB for User model

		const userProfile = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber,
		});

		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType,
			additionalDetails: userProfile._id,
			image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		// return response
		return res.status(200).json({
			success: true,
			message: "User registered successfully",
			newUser,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while registering new user",
		});
	}
};

// login
const login = async (req, res) => {
	try {
		// get data from request's body
		const { email, password } = req.body;

		// data validation, and check if the user exists or not
		if (!email || !password) {
			return res.status(403).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("-password"); // check if other fields can be removed from user

		if (!user) {
			return res.status(403).json({
				success: false,
				message: "No user registered with this email",
			});
		}

		// if user exists, check password is matching or not
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(403).json({
				success: false,
				message: "Incorrect password",
			});
		}

		// generate token, and store it in DB
		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
				accountType: user.accountType,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			}
		);

		user.token = token;

		// return response and cookie with generated token
		return res
			.cookie("token", token, {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			})
			.status(200)
			.json({
				success: true,
				message: "User Loged in successfully, token saved in cookie",
				user,
			});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while login of the user",
		});
	}
};

// change Password
const changePassword = async (req, res) => {
	try {
		// get data from request's body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;
		const { email } = req.cookies.token;

		// perform validation on password, check if password is correct
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(403).json({
				success: false,
				message: "No user registered with this email",
			});
		}

		const passwordMatch = await bcrypt.compare(oldPassword, user.password);

		if (!passwordMatch) {
			return res.status(403).json({
				success: false,
				message: "Incorrect password",
			});
		}

		// match newPassword and confirmNewPassword
		if (newPassword !== confirmNewPassword) {
			return res.status(403).json({
				success: false,
				message: "newPassword and confirmNewPassword not matching",
			});
		}

		// if both matches, then update new password in DB
		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ password: newPassword },
			{ new: true }
		);

		// send mail for password change to user's email
		await sendMAIL(
			updatedUser.email,
			"Password changed for your Study Notion account",
			`Hi ${updatedUser.firstName}, your Study Notion account password has been changed. If you are not the one behind this update, please feel free to reset your password at Study Notion website`
		);

		// return response
		return res.status(200).json({
			success: true,
			message: "Password changed successfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while changing password",
		});
	}
};

export { sendOTP, signup, login, changePassword };