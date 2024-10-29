import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalItems: localStorage.getItem("totalItem")
		? JSON.parse(localStorage.getItem("totalItems"))
		: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		setTotalItems(state, value) {
			state.totalItems = value.payload;
		},

		// add to cart
		// remove from cart
		// reset Cart
	},
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
