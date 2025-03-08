import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import { instance } from "../config/razorpay.js";
import mongoose from "mongoose";
import sendMAIL from "../utils/nodemailer.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import { paymentSuccessEmail } from "../mail/templates/paymentSuccessEmail.js";
import crypto from "crypto";
import CourseProgress from "../models/courseProgress.model.js";

const capturePayment = async (req, res) => {
	try {
		const { courseIds } = req.body;
		const userId = req.user.id;

		if (courseIds.length === 0) {
			return res.json({
				success: false,
				message: "Please provide the course id",
			});
		}

		let totalAmount = 0;

		for (const course_id of courseIds) {
			let course = await Course.findById(course_id);
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

			totalAmount += course.price;
		}

		// create an order
		const options = {
			amount: totalAmount * 100,
			currency: "INR",
			// reciept: Math.random(Date.now()).toString(),
		};

		const paymentResponse = await instance.orders.create(options);
		console.log("paymentResponse -> capture payment", paymentResponse);

		// return response
		return res.status(200).json({
			success: true,
			message: "Payment initiated successfully",
			data: paymentResponse,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Could not initiate an order",
		});
	}
};

const verifySignature = async (req, res) => {
	try {
		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			courseIds,
		} = req.body;

		const userId = req.user.id;

		console.log("req body in verifyPayment", req.body);
		console.log("req user in verifyPayment", userId);

		if (
			!razorpay_order_id ||
			!razorpay_payment_id ||
			!razorpay_signature ||
			!courseIds.length
		) {
			return res.json({
				success: false,
				message: "Please provide the required data",
			});
		}

		let body = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_SECRET)
			.update(body.toString())
			.digest("hex");

		if (expectedSignature !== razorpay_signature) {
			return res.json({
				success: false,
				message: "Signature verification failed",
			});
		}

		await enrollStudents(courseIds, userId, res);

		return res.json({
			success: true,
			message: "Signature verification successful",
		});
	} catch (error) {
		console.log("ERROR IN VERIFY PAYMENT", error);
		return res.json({
			success: false,
			message: "Signature verification failed",
		});
	}
};

const enrollStudents = async (courseIds, userId, res) => {
	try {
		if (!courseIds || !userId) {
			return res.json({
				success: false,
				message: "Please provide data for courses and userId",
			});
		}

		for (const courseId of courseIds) {
			const enrolledCourse = await Course.findByIdAndUpdate(
				{ _id: courseId },
				{ $push: { studentsEnrolled: userId } },
				{ new: true }
			);

			if (!enrolledCourse) {
				return res.status(500).json({
					success: false,
					message: "Course not found",
				});
			}

			const courseProgress = await CourseProgress.create({
				courseId: courseId,
				userId: userId,
				completedVideos: [],
			});

			const enrolledStudent = await User.findByIdAndUpdate(
				userId,
				{
					$push: {
						courses: courseId,
						courseProgress: courseProgress._id,
					},
				},
				{ new: true }
			);

			const emailResponse = await sendMAIL(
				enrolledStudent.email,
				`Successfully enrolled in ${enrolledCourse.courseName}`,
				courseEnrollmentEmail(
					enrolledCourse.courseName,
					`${enrolledStudent.firstName} ${enrolledStudent.lastName}`
				)
			);
			console.log("Email sent successfully", emailResponse);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in enrolling students",
		});
	}
};

const sendPaymentSuccessEmail = async (req, res) => {
	try {
		const { orderId, paymentId, amount } = req.body;
		const userId = req.user.id;

		if (!orderId || !paymentId || !amount || !userId) {
			return res.json({
				success: false,
				message: "Please provide the required data",
			});
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.json({
				success: false,
				message: "User not found",
			});
		}

		const emailResponse = await sendMAIL(
			user.email,
			`Payment Recieved`,
			paymentSuccessEmail(
				`${user.firstName} ${user.lastName}`,
				amount / 100,
				orderId,
				paymentId
			)
		);
	} catch (error) {
		console.log("Error while sending payment success email", error);
		return res.status(500).json({
			success: false,
			message: "Error in sending payment success email",
		});
	}
};

// capture payment and initiate the razorpay order
// const capturePayment = async (req, res) => {
// 	try {
// 		// get userId and courseId from req body
// 		const { courseId } = req.body;
// 		const userId = req.user.id;

// 		// validate data
// 		if (!courseId) {
// 			return res.json({
// 				success: false,
// 				message: "Please provide the course id",
// 			});
// 		}

// 		const course = await Course.findById(courseId);

// 		if (!course) {
// 			return res.json({
// 				success: false,
// 				message: "course not found",
// 			});
// 		}

// 		// check if user already paid for the same course
// 		const uid = new mongoose.Types.ObjectId(`${userId}`);
// 		if (course.studentsEnrolled.includes(uid)) {
// 			return res.status(200).json({
// 				success: false,
// 				message: "Student is already enrolled in this course",
// 			});
// 		}

// 		// create an order
// 		const amount = course.price;
// 		const currency = "INR";
// 		const options = {
// 			amount: amount * 100,
// 			currency,
// 			reciept: Math.random(Date.now()).toString(),
// 			notes: {
// 				courseId: course._id,
// 				userId,
// 			},
// 		};

// 		const paymentResponse = await instance.orders.create(options);
// 		console.log(paymentResponse);

// 		// return response
// 		return res.status(200).json({
// 			success: true,
// 			courseName: course.courseName,
// 			courseDescription: course.courseDescription,
// 			thumbnail: course.thumbnail,
// 			orderId: paymentResponse.id,
// 			currency: paymentResponse.currency,
// 			amount: paymentResponse.amount,
// 		});
// 	} catch (error) {
// 		console.error(error.message);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Could not initiate an order",
// 		});
// 	}
// };

// const verifySignature = async (req, res) => {
// 	const webhookSecret = process.env.WEBHOOK_SECRET;
// 	const signature = req.headers["x-razorpay-signature"];

// 	const shasum = crypto.createHmac("sha256", webhookSecret);
// 	shasum.update(JSON.stringify(req.body));
// 	const digest = shasum.digest("hex");

// 	if (signature === digest) {
// 		console.log("Payment is Authorised");

// 		const { courseId, userId } = req.body.payload.payment.entity.notes;

// 		try {
// 			// enroll the student in the course
// 			const course = await Course.findByIdAndUpdate(
// 				courseId,
// 				{
// 					$push: {
// 						studentsEnrolled: userId,
// 					},
// 				},
// 				{ new: true }
// 			);

// 			if (!course) {
// 				return res.status(500).json({
// 					success: false,
// 					message: "Course not found",
// 				});
// 			}

// 			console.log("Student successfully enrolled in the course");

// 			// add the course in student's enrolled courses list
// 			const user = await User.findByIdAndUpdate(
// 				userId,
// 				{
// 					$push: {
// 						courses: courseId,
// 					},
// 				},
// 				{ new: true }
// 			);

// 			console.log("Course added in student dashboard");

// 			// send course purchase confirmation mail
// 			const fullName = `${user.firstName} ${user.lastName}`;
// 			const emailResponse = await sendMAIL(
// 				user.email,
// 				courseEnrollmentEmail(course.courseName, fullName)
// 			);

// 			return res.status(200).json({
// 				success: true,
// 				message:
// 					"Signature verified and course added to the student's dashboard",
// 			});
// 		} catch (error) {
// 			console.error(error.message);
// 			return res.status(500).json({
// 				success: false,
// 				message: "Invalid signature",
// 			});
// 		}
// 	}
// };

export { capturePayment, verifySignature, sendPaymentSuccessEmail };
