import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import IconButton from "../../common/IconButton.jsx";
import emptyCartImg from "../../../assets/Images/empty-cart.png";

const Cart = () => {
  const { total, totalItems, cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Purchased Courses: ", courses);
    // Payment Api integration
  };

  return (
    <div className="text-richblack-5 flex flex-col justify-start  p-4 sm:p-6 gap-y-4 min-h-[60vh] h-full w-full">
      <h1 className="font-semibold text-3xl mb-2 w-full">Your Cart</h1>
      <p className="mb-2 w-full">{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-between gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl">
          {/* Cart Courses */}
          <div className="flex-1 flex flex-col gap-6">
            {cart.map((course, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-4 bg-richblack-800 rounded-lg p-3"
              >
                <img
                  src={course?.thumbnail}
                  alt="course thumbnail"
                  className="w-32 h-20 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-semibold text-lg">{course?.courseName}</p>
                  <p className="text-richblack-300 text-sm">
                    {course?.category?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-400 font-semibold">4.3</span>
                    <ReactStars
                      count={5}
                      size={18}
                      edit={false}
                      color2="#ffd700"
                      emptyIcon={<GiNinjaStar />}
                      fullIcon={<GiNinjaStar />}
                    />
                    <span className="text-xs text-richblack-300">
                      {course?.ratingAndReview?.length} Ratings
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 min-w-[80px]">
                  <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="flex items-center gap-1 text-pink-200 hover:text-pink-400 transition-colors"
                  >
                    <RiDeleteBin6Line size={18} />
                    <span className="text-xs">Remove</span>
                  </button>
                  <p className="font-bold text-base text-yellow-50">
                    Rs {course?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Amount */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-richblack-900 rounded-xl p-4 border border-richblack-700 mt-4 lg:mt-0">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-2xl font-bold text-yellow-50">Rs {total}</p>

            <IconButton
              text="Buy Now"
              onclick={handleBuyCourse}
              customClasses={"w-full justify-center mt-2"}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            className="w-[35rem] h-[35rem] object-contain mb-4 opacity-80"
          />
          <p className="text-xl font-medium text-richblack-300">
            Your Cart is Empty
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
