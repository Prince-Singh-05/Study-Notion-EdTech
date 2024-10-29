import toast from "react-hot-toast";
import { setToken } from "../../redux/slices/authSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { setUser } from "../../redux/slices/profileSlice";

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
