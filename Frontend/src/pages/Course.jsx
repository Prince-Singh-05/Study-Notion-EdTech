import React, { useEffect, useState } from "react";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import RatingStars from "../components/common/RatingStars";
import avgRating from "../utils/avgRating";
import { formatDate } from "../utils/formatDate";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { addToCart } from "../redux/slices/cartSlice";
import { FaCheck, FaChevronDown, FaShareFromSquare } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../utils/constants";

const Course = () => {
	const { user, loading } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const { paymentLoading } = useSelector((state) => state.course);
	const { cart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [avgReviewCount, setAvgReviewCount] = useState(0);
	const [courseData, setCourseData] = useState(null);
	const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const [isActive, setIsActive] = useState([]);

	useEffect(() => {
		const getCourse = async () => {
			try {
				const result = await fetchCourseDetails(courseId, dispatch);
				setCourseData(result);
			} catch (error) {
				console.log("Could not fetch course details");
			}
		};

		getCourse();
	}, [courseId]);

	console.log("COURSE", courseData);
	// console.log("USER", user);
	// console.log("CART", cart);

	useEffect(() => {
		if (courseData?.ratingAndReview?.length > 0) {
			const count = avgRating(courseData?.ratingAndReview);
			setAvgReviewCount(count);
		}
	}, [courseData]);

	useEffect(() => {
		let lectures = 0;
		courseData?.courseContent?.forEach((sec) => {
			lectures += sec.subSections.length || 0;
		});
		setTotalNoOfLectures(lectures);
	}, [courseData]);

	const handleBuyNow = () => {
		if (token) {
			buyCourse(token, [courseId], user, navigate, dispatch);
			return;
		}

		setConfirmationModal({
			text1: "You are not logged in",
			text2: "Please login to buy this course",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	const handleAddToCart = () => {
		if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast.error("You can't add to cart as an instructor");
			return;
		}
		if (token) {
			dispatch(addToCart(courseData));
			return;
		}

		setConfirmationModal({
			text1: "You are not logged in",
			text2: "Please login to add to cart",
			btn1Text: "Login",
			btn2Text: "Cancel",
			btn1Handler: () => navigate("/login"),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	const handleActive = (id) => {
		setIsActive(
			!isActive.includes(id)
				? isActive.concat(id)
				: isActive.filter((item) => item !== id)
		);
	};

	const handleShare = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success("Link copied to clipboard");
	};

	if (loading || !courseData) {
		return (
			<div className="flex justify-center items-center">Loading...</div>
		);
	}

	return (
		<div className="text-richblack-5 flex flex-col lg:w-11/12 w-full mx-auto justify-center gap-y-6 mt-14">
			{/* Section 1 */}
			<div className="flex relative justify-between p-6 bg-richblack-800/65">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-3xl font-bold">
						{courseData?.courseName}
					</h1>
					<p className="text-richblack-500 text-sm">
						{courseData?.courseDescription}
					</p>
					<div className="flex items-center gap-x-3">
						<span className="text-sm">{avgReviewCount || 0}</span>
						<RatingStars reviewCount={avgReviewCount} />
						<span className="text-sm">
							{`(${courseData?.ratingAndReview?.length} reviews)`}
						</span>
						<span className="text-sm">
							{courseData?.studentsEnrolled?.length} students
							enrolled
						</span>
					</div>

					<span className="text-sm">
						Created By {courseData?.instructor?.firstName}{" "}
						{courseData?.instructor?.lastName}
					</span>

					<div className="flex gap-x-3 items-center">
						<span
							className="text-sm flex items-center
						 gap-x-1"
						>
							<MdOutlineAccessTimeFilled />
							Created on {formatDate(courseData?.createdAt)}
						</span>
						<span
							className="text-sm flex items-center
						 gap-x-1"
						>
							<AiOutlineGlobal />
							English
						</span>
					</div>
				</div>

				<div className="flex flex-col gap-y-3 absolute top-[20%] right-[10%] bg-richblack-700 sm:w-[30%] p-4 rounded-lg">
					<img
						src={courseData?.thumbnail}
						alt="Course Thumbnail"
						className="rounded-md object-cover"
					/>

					<span className="text-xl font-bold">
						₹ {courseData?.price}
					</span>

					<button
						className="rounded-lg bg-yellow-100 px-4 py-2 w-full text-black font-bold"
						onClick={() =>
							user &&
							courseData?.studentsEnrolled?.includes(user?._id)
								? navigate("/dashboard/enrolled-courses")
								: handleBuyNow()
						}
					>
						{user &&
						courseData?.studentsEnrolled?.includes(user?._id)
							? "Go to Course"
							: "Buy Now"}
					</button>
					{!courseData?.studentsEnrolled?.includes(user?._id) && (
						<button
							className="rounded-lg bg-richblack-900 px-4 py-2 w-full text-white/70 font-bold"
							onClick={() =>
								cart.find((item) => item._id === courseData._id)
									? navigate("/dashboard/cart")
									: handleAddToCart()
							}
						>
							{cart?.find((item) => item._id === courseData._id)
								? "Go to Cart"
								: "Add to Cart"}
						</button>
					)}

					<span className="text-sm mx-auto text-richblack-200 font-semibold">
						30-Day-Money-Back-Guarantee
					</span>
					<div>
						<p className="font-bold text-lg">
							This courseData includes:
						</p>
						<ul list-style-type="none">
							{courseData?.instructions?.map((content, index) => (
								<li
									key={index}
									className="flex items-center text-sm gap-x-2 text-green-400"
								>
									<FaCheck />
									{JSON.parse(content)}
								</li>
							))}
						</ul>
					</div>

					<div
						className="flex items-center mx-auto text-lg cursor-pointer text-yellow-200 gap-x-2"
						onClick={() => handleShare()}
					>
						<FaShareFromSquare />
						Share
					</div>
				</div>
			</div>

			{/* Section 2 */}
			<div className="flex flex-col gap-y-3 w-[60%] px-6">
				<p>What You'll Learn</p>
				{courseData?.whatYouWillLearn}
			</div>

			{/* Section 3 */}
			<div className="flex flex-col gap-y-3 w-[60%] px-6">
				<p className="text-xl font-bold">Course Content</p>
				<div className="flex justify-between items-center gap-x-3 mt-1">
					<div className="flex gap-x-3">
						<span>{`${courseData?.courseContent?.length} Section(s)`}</span>
						<span>{`${totalNoOfLectures} Lecture(s)`}</span>
					</div>
					<div
						className="cursor-pointer text-yellow-100"
						onClick={() => setIsActive([])}
					>
						Collapse all sections
					</div>
				</div>

				<div>
					{courseData?.courseContent?.map((section) => (
						<details
							key={section._id}
							className="bg-richblack-400 border border-richblack-100"
							open={isActive.includes(section._id)}
						>
							<summary
								className="flex items-center p-4 justify-between gap-x-3 cursor-pointer"
								onClick={() => handleActive(section._id)}
							>
								<div className="flex items-center gap-x-2">
									<FaChevronDown className="arrow" />
									{section?.sectionName}
								</div>

								<div className="text-yellow-100">{`${section?.subSections?.length} Lectures`}</div>
							</summary>

							<div>
								{section?.subSections?.map((lecture) => (
									<div
										key={lecture._id}
										className="flex bg-richblack-900 cursor-pointer items-center gap-x-2 p-4"
									>
										<IoVideocam />
										<p className="font-semibold">
											{lecture?.title}
										</p>
									</div>
								))}
							</div>
						</details>
					))}
				</div>
			</div>

			{/* Confirmation Modal */}
			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</div>
	);
};

export default Course;
