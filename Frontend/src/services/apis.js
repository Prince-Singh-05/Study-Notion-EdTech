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
export const settingsEndpoints = {
	UPDATE_PRFILE_API: BASE_URL + "/profile/updateProfile",
	CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
	DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

// Categories API
export const categories = {
	CATEGORIES_API: BASE_URL + "/course/getAllCategories",
};
