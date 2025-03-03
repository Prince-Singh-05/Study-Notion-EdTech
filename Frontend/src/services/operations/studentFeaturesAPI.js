import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
const { VITE_RAZORPAY_KEY } = import.meta.env;
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const {
	COURSE_PAYMENT_API,
	COURSE_VERIFY_API,
	SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;

		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}

export const buyCourse = async (
	token,
	courseIds,
	userDetails,
	navigate,
	dispatch
) => {
	const toastId = toast.loading("Loading...");
	try {
		// load razorpay script
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			toast.error("Could not load Razorpay script");
			return;
		}

		// initiate the order
		const orderResponse = await apiConnector(
			"POST",
			COURSE_PAYMENT_API,
			{ courseIds },
			{
				Authorization: `Bearer ${token}`,
			}
		);

		if (!orderResponse.data.success) {
			throw new Error(orderResponse.data.message);
		}

		console.log("buyCourse -> orderResponse", orderResponse);

		// options
		const options = {
			key: VITE_RAZORPAY_KEY,
			currency: orderResponse.data.data.currency,
			amount: orderResponse.data.data.amount,
			order_id: orderResponse.data.data.id,
			name: "StudyNotion",
			description: "Thank you for purchasing the course",
			image: rzpLogo,
			prefill: {
				name: `${userDetails.firstName}`,
				email: `${userDetails.email}`,
			},
			handler: async function (response) {
				console.log("response in buy course", response);

				// send success email
				sendPaymentSuccessEmail(
					response,
					orderResponse.data.data.amount,
					token
				);

				// verify Payment
				verifyPayment(
					{ ...response, courseIds },
					token,
					navigate,
					dispatch
				);
			},
		};

		// add razorpay modal
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
		paymentObject.on("payment.failed", function (response) {
			toast.error("Payment failed");
			console.log(response.error);
		});
	} catch (error) {
		console.log("PAYMENT API ERROR....", error);
		toast.error("Could not initiate the payment");
	}
	toast.dismiss(toastId);
};

const sendPaymentSuccessEmail = async (response, amount, token) => {
	try {
		await apiConnector(
			"POST",
			SEND_PAYMENT_SUCCESS_EMAIL_API,
			{
				orderId: response.razorpay_order_id,
				paymentId: response.razorpay_payment_id,
				amount,
			},
			{
				Authorization: `Bearer ${token}`,
			}
		);
	} catch (error) {
		console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
	}
};

// verify the payment
const verifyPayment = async (bodyData, token, navigate, dispatch) => {
	const toastId = toast.loading("Verifying payment...");
	dispatch(setPaymentLoading(true));
	try {
		const response = await apiConnector(
			"POST",
			COURSE_VERIFY_API,
			bodyData,
			{
				Authorization: `Bearer ${token}`,
			}
		);

		if (!response.data.success) {
			throw new Error(response.data.message);
		}

		toast.success("Payment Successful, you are now enrolled in the course");
		console.log("VERIFY PAYMENT RESPONSE", response);
		navigate("/dashboard/enrolled-courses");
		dispatch(resetCart());
	} catch (error) {
		console.log("VERIFY PAYMENT ERROR....", error);
		toast.error("Payment could not be verified");
	}
	toast.dismiss(toastId);
	dispatch(setPaymentLoading(false));
};
