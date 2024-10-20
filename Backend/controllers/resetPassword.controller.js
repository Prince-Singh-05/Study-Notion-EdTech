import User from "../models/user.model";
import sendMAIL from "../utils/nodemailer";
import bcrypt from "bcrypt";

// resetPasswordToken
const resetPasswordToken = async (req, res) => {
	try {
		// get email from request's body, validate email
		const { email } = req.body;

		const user = await User.findOne({ email }).select("-password");

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "No user found",
			});
		}

		// if user exists, generate token for password reset
		const token = crypto.randomUUID();

		// create frontend url
		const url = `http://localhost:3000/reset-password/${token}`;

		// sendMAIL on the email with the above url to reset the password
		await sendMAIL(
			email,
			"Reset Password",
			`Hi ${user.firstName}, your reset password link is ${url}`
		);

		// save token and expiry time in DB
		await User.findOneAndUpdate(
			{ email },
			{
				token,
				resetPasswordExpiry: Date.now() + 5 * 60 * 1000,
			}
		);

		// return response
		return res.status(200).json({
			success: true,
			message: "reset password link sent on email successfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while sending reset password url",
		});
	}
};

// resetPaswword
const resetPassword = async (req, res) => {
	try {
		// get data from req body, validation of data
		const { password, confirmPassword, token } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Password and confirm password does not match",
			});
		}

		// get user from DB using token
		const user = User.findOne({ token }).select("-password");

		// if user not found -> token is invalid
		if (!user) {
			return res.json({
				success: false,
				message: "Token is invalid",
			});
		}

		// check token expiry
		if (user.resetPasswordExpiry < Date.now()) {
			return res.json({
				success: false,
				message:
					"Your token has expired, please re-generate your token",
			});
		}

		// hash the new password
		const hashedPassword = await bcrypt.hash(password, 8);

		// update the password in DB
		await User.findByIdAndUpdate({ token }, { password: hashedPassword });

		// return response
		return res.status(200).json({
			success: true,
			message: "Password Reset successfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error in reset password",
		});
	}
};

export { resetPasswordToken, resetPassword };
