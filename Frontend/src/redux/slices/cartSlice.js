import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
	totalItems: localStorage.getItem("totalItem")
		? JSON.parse(localStorage.getItem("totalItems"))
		: 0,
	total: localStorage.getItem("total")
		? JSON.parse(localStorage.getItem("total"))
		: 0,
	cart: localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart"))
		: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// add to cart
		addToCart(state, action) {
			const course = action.payload;
			const index = state.cart.findIndex(
				(item) => item._id === course._id
			);

			if (index >= 0) {
				// If the index is found, means the course is already in the cart
				toast.error("Course already in cart");
				return;
			}

			// Index is not found
			// course is not in cart, so add it in cart
			state.cart.push(course);

			// update the totalItems count and total price
			state.totalItems++;
			state.total += course.price;

			// update to localStorage
			localStorage.setItem("cart", JSON.stringify(state.cart));
			localStorage.setItem("total", JSON.stringify(state.total));
			localStorage.setItem(
				"totalItems",
				JSON.stringify(state.totalItems)
			);

			toast.success("Course added to cart");
		},

		// remove from cart
		removeFromCart(state, action) {
			const courseId = action.payload;
			const index = state.cart.findIndex((item) => item._id === courseId);

			if (index >= 0) {
				// If index is found, remove the course
				state.totalItems--;
				state.total -= state.cart[index].price;
				state.cart.splice(index, 1);

				// update the localStorage
				localStorage.setItem("cart", JSON.stringify(state.cart));
				localStorage.setItem("total", JSON.stringify(state.total));
				localStorage.setItem(
					"totalItems",
					JSON.stringify(state.totalItems)
				);

				toast.success("Course removed from cart");
			}
		},

		// reset Cart
		resetCart(state, action) {
			state.cart = [];
			state.total = 0;
			state.totalItems = 0;

			// update the localStorage
			localStorage.removeItem("cart");
			localStorage.removeItem("total");
			localStorage.removeItem("totalItems");
		},
	},
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
