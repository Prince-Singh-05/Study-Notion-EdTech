const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth Endpoints
export const authEndpoints = {
	SENDOTP_API: BASE_URL + "/auth/sendotp",
	SIGNUP_API: BASE_URL + "/auth/signup",
	LOGIN_API: BASE_URL + "/auth/login",
	RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
	RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
};

// Profile Endpoints
export const profileEndpoints = {
	GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
	GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
};

// Settings Page API
export const settingEndpoints = {
	UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
	CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
	DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
	UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
};

// Categories API
export const categories = {
	CATEGORIES_API: BASE_URL + "/course/getAllCategories",
	CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
	GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",
};

// Ratings and Reviews
export const reviewEndpoints = {
	CREATE_REVIEW_API: BASE_URL + "/course/createReview",
	GET_AVG_RATING_API: BASE_URL + "/course/getAverageRating",
	ALL_REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
	COURSE_REVIEWS_DETAILS_API: BASE_URL + "/course/getReviewsForCourse",
};

export const contactusEndpoints = {
	CONTACT_US_API: BASE_URL + "/reach/contact",
};
