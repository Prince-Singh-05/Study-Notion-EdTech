import { Router } from "express";
import {
	capturePayment,
	verifySignature,
} from "../controllers/payment.controller";
import { auth, isStudent } from "../middlewares/auth.middleware";
const paymentRouter = Router();

paymentRouter.post("/capturePayment", auth, isStudent, capturePayment);
paymentRouter.post("/verifySignature", verifySignature);

export default paymentRouter;
