import mongoose from "mongoose";
import sendMAIL from "../utils/nodemailer";
import emailTemplate from "../mail/templates/emailVerificationTemplate";

const otpSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			expires: 5 * 60 * 1000,
		},
	},
	{ timestamps: true }
);

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await sendMAIL(
			email,
			"Verification Email from Study Notion",
			emailTemplate(otp)
		);
		console.log("Email sent successfully", mailResponse.response);
	} catch (error) {
		console.log("error while sending verification mail ", error.message);
		throw error;
	}
}

otpSchema.pre("save", async function (next) {
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
