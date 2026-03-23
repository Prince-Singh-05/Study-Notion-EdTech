import { Router } from "express";
import { auth, isInstructor } from "../middlewares/auth.middleware.js";
import {
	deleteAccount,
	getAllUserDetails,
	getEnrolledCourses,
	instructorDashboard,
	updateProfile,
	updateProfilePicture,
} from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.delete("/deleteProfile", auth, deleteAccount);
profileRouter.put("/updateProfile", auth, updateProfile);
profileRouter.get("/getUserDetails", auth, getAllUserDetails);
profileRouter.put("/updateProfilePicture", auth, updateProfilePicture);
profileRouter.get("/getEnrolledCourses", auth, getEnrolledCourses);
profileRouter.get(
	"/instructorDashboard",
	auth,
	isInstructor,
	instructorDashboard
);

export default profileRouter;
