import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import IconButton from "../../common/IconButton.jsx";

const Cart = () => {
	const { total, totalItems, cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleBuyCourse = () => {
		const courses = cart.map((course) => course._id);
		console.log("Purchased Courses: ", courses);
		// Payment Api integration
	};

	return (
		<div className="text-richblack-5 flex flex-col justify-center p-6 gap-y-6">
			<h1 className="font-semibold text-3xl">Your Cart</h1>
			<p>{totalItems} Courses in Cart</p>

			{total > 0 ? (
				<div className="lg:w-[75%] flex justify-between gap-y-10 lg:pl-24 transition-all duration-1000">
					{/* Cart Courses */}
					<div>
						{cart.map((course, index) => (
							<div key={index}>
								<div>
									<img src={course?.thumbnail} />
									<div>
										<p>{course?.courseName}</p>
										<p>{course?.category?.name}</p>
										<div>
											<span>4.3</span>
											<ReactStars
												count={5}
												size={20}
												edit={false}
												activeColor="#ffd700"
												emptyIcon={<GiNinjaStar />}
												fullIcon={<GiNinjaStar />}
											/>

											<span>
												{
													course?.ratingAndReview
														?.length
												}{" "}
												Ratings
											</span>
										</div>
									</div>
								</div>

								<div>
									<button
										onClick={() =>
											dispatch(removeFromCart(course._id))
										}
									>
										<RiDeleteBin6Line />
										<span>Remove</span>
									</button>

									<p>Rs {course?.price}</p>
								</div>
							</div>
						))}
					</div>

					{/* Cart Amount */}
					<div>
						<p>Total:</p>
						<p>Rs {total}</p>

						<IconButton
							text="Buy Now"
							onclick={handleBuyCourse}
							customClasses={"w-full justify-center"}
						/>
					</div>
				</div>
			) : (
				<p>Your Cart is Empty</p>
			)}
		</div>
	);
	{
		totalItems;
	}
};

export default Cart;
