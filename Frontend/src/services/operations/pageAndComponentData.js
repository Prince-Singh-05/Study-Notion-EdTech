import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { categories } from "../apis";

export const getCatalogPageData = async (categoryId) => {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
		const response = await apiConnector(
			"POST",
			categories.GET_CATEGORY_PAGE_DETAILS_API,
			{ categoryId }
		);

		if (!response?.data?.success) {
			throw new Error("Could not fetch category page details");
		}

		result = response?.data?.data;
	} catch (error) {
		console.log("CATALOG PAGE DATA API ERROR.....", error);
		toast.error(error.message);
		result = error.response?.data;
	}
	toast.dismiss(toastId);
	return result;
};
