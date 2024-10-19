import Course from "../models/course.model";
import User from "../models/user.model";
import { instance } from "../config/razorpay";
import mongoose from "mongoose";
import sendMAIL from "../utils/nodemailer";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail";

// capture payment and initiate the razorpay order
const capturePayment = async (req, res) => {
	try {
		// get userId and courseId from req body
		const { courseId } = req.body;
		const userId = req.user.id;

		// validate data
		if (!courseId) {
			return res.json({
				success: false,
				message: "Please provide the course id",
			});
		}

		const course = await Course.findById(courseId);

		if (!course) {
			return res.json({
				success: false,
				message: "course not found",
			});
		}

		// check if user already paid for the same course
		const uid = new mongoose.Types.ObjectId(`${userId}`);
		if (course.studentsEnrolled.includes(uid)) {
			return res.status(200).json({
				success: false,
				message: "Student is already enrolled in this course",
			});
		}

		// create an order
		const amount = course.price;
		const currency = "INR";
		const options = {
			amount: amount * 100,
			currency,
			reciept: Math.random(Date.now()).toString(),
			notes: {
				courseId: course._id,
				userId,
			},
		};

		const paymentResponse = await instance.orders.create(options);
		console.log(paymentResponse);

		// return response
		return res.status(200).json({
			success: true,
			courseName: course.courseName,
			courseDescription: course.courseDescription,
			thumbnail: course.thumbnail,
			orderId: paymentResponse.id,
			currency: paymentResponse.currency,
			amount: paymentResponse.amount,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			success: false,
			message: "Could not initiate an order",
		});
	}
};

const verifySignature = async (req, res) => {
	const webhookSecret = process.env.WEBHOOK_SECRET;
	const signature = req.headers["x-razorpay-signature"];

	const shasum = crypto.createHmac("sha256", webhookSecret);
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest("hex");

	if (signature === digest) {
		console.log("Payment is Authorised");

		const { courseId, userId } = req.body.payload.payment.entity.notes;

		try {
			// enroll the student in the course
			const course = await Course.findByIdAndUpdate(
				courseId,
				{
					$push: {
						studentsEnrolled: userId,
					},
				},
				{ new: true }
			);

			if (!course) {
				return res.status(500).json({
					success: false,
					message: "Course not found",
				});
			}

			console.log("Student successfully enrolled in the course");

			// add the course in student's enrolled courses list
			const user = await User.findByIdAndUpdate(
				userId,
				{
					$push: {
						courses: courseId,
					},
				},
				{ new: true }
			);

			console.log("Course added in student dashboard");

			// send course purchase confirmation mail
			const fullName = `${user.firstName} ${user.lastName}`;
			const emailResponse = await sendMAIL(
				user.email,
				courseEnrollmentEmail(course.courseName, fullName)
			);

			return res.status(200).json({
				success: true,
				message:
					"Signature verified and course added to the student's dashboard",
			});
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				success: false,
				message: "Invalid signature",
			});
		}
	}
};

export { capturePayment, verifySignature };
