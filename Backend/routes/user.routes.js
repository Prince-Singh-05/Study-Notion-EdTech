import { Router } from "express";
import {
	changePassword,
	login,
	signup,
	sendOTP,
} from "../controllers/auth.controller";
import {
	resetPassword,
	resetPasswordToken,
} from "../controllers/resetPassword.controller";
import { auth } from "../middlewares/auth.middleware";

const userRouter = Router();

// Routes for Login, Signup, and Authentication

// Authentication routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/change-password", auth, changePassword);
userRouter.post("/sendotp", sendOTP);

// Reset Password

// Route for generating a reset password token
userRouter.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
userRouter.post("/reset-password", resetPassword);

export default userRouter;
