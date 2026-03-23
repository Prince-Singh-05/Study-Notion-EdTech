import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ReactStars from "react-stars";
import { reviewEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

const ReviewSlider = () => {
	const [reviews, setReivews] = useState([]);
	const truncateWords = 15;

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await apiConnector(
				"GET",
				reviewEndpoints.ALL_REVIEWS_DETAILS_API
			);
			console.log("ALL_REVIEWS_DETAILS_API RESPONSE...", response);

			if (response?.data?.success) {
				setReivews(response?.data?.data);
			}
		};

		fetchReviews();
	}, []);

	return (
		<div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent text-white">
			<Swiper
				slidesPerView={4}
				spaceBetween={24}
				loop={true}
				freeMode={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[FreeMode, Pagination, Autoplay]}
				className="w-full"
			>
				{reviews?.map((review, index) => (
					<SwiperSlide key={index}>
						<div>
							<div>
								<img
									src={
										review?.user?.image
											? review?.user?.image
											: `https://api.dicebear.com/9.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
									}
									alt="Profile Pic"
									className="h-9 w-9 rounded-full object-cover"
								/>
								<div className="flex flex-col">
									<h1 className="font-semibold text-richblack-5">
										{review?.user?.firstName}{" "}
										{review?.user?.lastName}
									</h1>
									<h2 className="text-[12px] font-medium text-richblack-500">
										{review?.course?.courseName}
									</h2>
								</div>
							</div>
							<p className="font-medium text-richblack-25">
								{review?.review.split(" ").length >
								truncateWords
									? `${review?.review
											.split(" ")
											.slice(0, truncateWords)
											.join(" ")} ...`
									: `${review?.review}`}
							</p>
							<div className="flex items-center gap-2">
								<h3 className="font-semibold text-yellow-100">
									{review?.rating.toFixed(1)}/5
								</h3>
								<ReactStars
									count={5}
									value={review?.rating}
									edit={false}
									size={20}
									half={true}
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ReviewSlider;
