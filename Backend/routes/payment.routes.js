import { Router } from "express";
import {
	capturePayment,
	verifySignature,
} from "../controllers/payment.controller.js";
import { auth, isStudent } from "../middlewares/auth.middleware.js";
const paymentRouter = Router();

paymentRouter.post("/capturePayment", auth, isStudent, capturePayment);
paymentRouter.post("/verifySignature", verifySignature);

export default paymentRouter;
