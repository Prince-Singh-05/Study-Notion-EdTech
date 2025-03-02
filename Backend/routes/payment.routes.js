import { Router } from "express";
import {
	capturePayment,
	sendPaymentSuccessEmail,
	verifySignature,
} from "../controllers/payment.controller.js";
import { auth, isStudent } from "../middlewares/auth.middleware.js";
const paymentRouter = Router();

paymentRouter.post("/capturePayment", auth, isStudent, capturePayment);
paymentRouter.post("/verifySignature", auth, isStudent, verifySignature);
paymentRouter.post(
	"/sendPaymentSuccessEmail",
	auth,
	isStudent,
	sendPaymentSuccessEmail
);

export default paymentRouter;
