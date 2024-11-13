import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
	deleteAccount,
	getAllUserDetails,
	getEnrolledCourses,
	updateProfile,
	updateProfilePicture,
} from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.delete("/deleteProfile", auth, deleteAccount);
profileRouter.put("/updateProfile", auth, updateProfile);
profileRouter.get("/getUserDetails", auth, getAllUserDetails);
profileRouter.put("/updateProfilePicture", auth, updateProfilePicture);
profileRouter.get("/getEnrolledCourses", auth, getEnrolledCourses);

export default profileRouter;
