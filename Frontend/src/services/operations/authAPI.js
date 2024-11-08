import toast from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";

export function sendotp(email, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		const toastId = toast.loading("Loading...");
		try {
			const response = await apiConnector(
				"POST",
				authEndpoints.SENDOTP_API,
				{ email }
			);

			console.log("SENDOTP API RESPONSE.......", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("OTP sent successfully");

			navigate("/verify-email");
		} catch (error) {
			console.log("SENDOTP API ERROR.......", error);
			toast.error("Email already in use");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function signup(
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	accountType,
	otp,
	navigate
) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"POST",
				authEndpoints.SIGNUP_API,
				{
					firstName,
					lastName,
					email,
					password,
					confirmPassword,
					accountType,
					otp,
				}
			);

			console.log("SIGNUP API RESPONSE.....", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Signup Successful");
			navigate("/login");
		} catch (error) {
			console.log("SIGNUP API ERROR.......", error);
			toast.error("Signup Failed");
			navigate("/signup");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"POST",
				authEndpoints.LOGIN_API,
				{
					email,
					password,
				}
			);

			console.log("PRINTING THE LOGIN API RESPONSE......", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Login Successful");
			dispatch(setToken(response.data?.token));
			const userImage = response.data?.user?.image
				? response.data.user.image
				: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`;

			dispatch(
				setUser({
					...response.data.user,
					image: userImage,
				})
			);

			localStorage.setItem("token", JSON.stringify(response.data.token));
			localStorage.setItem("user", JSON.stringify(response.data.user));
			navigate("/dashboard/my-profile");
		} catch (error) {
			console.log("LOGIN API ERROR......", error);
			toast.error("Login Failed");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setUser(null));
		dispatch(setToken(null));
		dispatch(resetCart());

		localStorage.removeItem("user");
		localStorage.removeItem("token");

		toast.success("Logged Out");
		navigate("/");
	};
}

export function resetPasswordToken(email, setEmailSent) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));

		try {
			const response = await apiConnector(
				"POST",
				authEndpoints.RESETPASSTOKEN_API,
				{ email }
			);

			console.log("RESET PASSWORD TOKEN API RESPONSE......", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Reset email sent successfully");

			setEmailSent(true);
		} catch (error) {
			console.log("RESET PASSWORD TOKEN ERROR......", error);
			toast.error("Could not sent reset email");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function resetPassword(
	password,
	confirmPassword,
	token,
	setResetPending
) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));

		try {
			const response = await apiConnector(
				"POST",
				authEndpoints.RESETPASSWORD_API,
				{ password, confirmPassword, token }
			);

			console.log("RESET PASSWORD API RESPONSE......", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Password reset successfully");
			setResetPending(false);
		} catch (error) {
			console.log("RESET PASSWORD API ERROR.....", error);
			toast.error("Could not reset password");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}
