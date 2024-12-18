import { Router } from "express";

// Importing Middlewares
import {
	auth,
	isAdmin,
	isInstructor,
	isStudent,
} from "../middlewares/auth.middleware.js";

// Import the Controllers

// Course Controllers Import
import {
	createCourse,
	getAllCourses,
	getCourseDetails,
} from "../controllers/course.controller.js";

// Sections Controllers Import
import {
	createSection,
	deleteSection,
	updateSection,
} from "../controllers/section.controller.js";

// Sub-Sections Controllers Import
import {
	createSubSection,
	deleteSubSection,
	updateSubSection,
} from "../controllers/subSection.controller.js";

// Categories Controllers Import
import {
	createCategory,
	getAllCategories,
	getCategoryPageDetails,
} from "../controllers/category.controller.js";

// Rating/Review Controllers Import
import {
	createReview,
	getAllReviews,
	getAllReviewsForCourse,
	getAverageRating,
} from "../controllers/ratingAndReview.controller.js";

const courseRouter = Router();

// Course Routes (Only by Instructors)

courseRouter.post("/createCourse", auth, isInstructor, createCourse);
courseRouter.post("/addSection", auth, isInstructor, createSection);
courseRouter.post("/updateSection", auth, isInstructor, updateSection);
courseRouter.post("/deleteSection", auth, isInstructor, deleteSection);
courseRouter.post("/addSubSection", auth, isInstructor, createSubSection);
courseRouter.post("/updateSubSection", auth, isInstructor, updateSubSection);
courseRouter.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
courseRouter.get("/getAllCourses", getAllCourses);
courseRouter.get("/getCourseDetails", getCourseDetails);

// Category Routes (Only by Admins)

courseRouter.post("/createCategory", auth, isAdmin, createCategory);
courseRouter.get("/getAllCategories", getAllCategories);
courseRouter.get("/getCategoryPageDetails", getCategoryPageDetails);

// Rating and Review Routes

courseRouter.post("/createReview", auth, isStudent, createReview);
courseRouter.get("/getAverageRating", getAverageRating);
courseRouter.get("/getReviews", getAllReviews);
courseRouter.get("/getReviewsForCourse", getAllReviewsForCourse);

export default courseRouter;
