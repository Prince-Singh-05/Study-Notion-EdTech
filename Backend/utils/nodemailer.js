import nodemailer from "nodemailer";

const sendMAIL = async (email, title, body) => {
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		let info = transporter.sendMail({
			from: "StudyNotion || Prince Singh",
			to: `${email}`,
			subject: `${title}`,
			html: `${body}`,
		});

		console.log("printing mail on console ", info);
		return info;
	} catch (error) {
		console.log("Error while sending mail ", error.message);
	}
};

export default sendMAIL;
