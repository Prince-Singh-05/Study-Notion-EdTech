import sendMAIL from "../utils/nodemailer.js";
import { contactUsEmail } from "../mail/templates/contactFormEmail.js";

const contactUsController = async () => {
	try {
		const { email, firstName, lastName, message, phoneNo, countrycode } =
			req.body;

		const emailRes = await sendMAIL(
			email,
			"Your Data send successfully",
			contactUsEmail(
				email,
				firstName,
				lastName,
				message,
				phoneNo,
				countrycode
			)
		);
		console.log("Email Response ", emailRes);

		return res.status(200).json({
			success: true,
			message: "Email send Successfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			success: false,
			message: "Error while sending contact us email",
		});
	}
};

export { contactUsController };
