import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import avgRating from "../../../utils/avgRating";

const CourseCard = ({ course, HEIGHT }) => {
	const [avgReviewCount, setAvgReviewCount] = useState(0);

	useEffect(() => {
		const count = avgRating(course?.ratingAndReview);
		setAvgReviewCount(count);
	}, [course]);

	return (
		<div>
			<Link to={`/course/${course?._id}`}>
				<div>
					<img
						src={course?.thumbnail}
						alt={course?.courseName}
						className={`${HEIGHT} rounded-lg object-cover`}
					/>
				</div>
				<div>
					<p>{course?.courseName}</p>
					<p>
						By{" "}
						<span className="font-semibold text-yellow-50">
							{course?.instructor?.firstName}{" "}
							{course?.instructor?.lastName}
						</span>
					</p>
					<div className="flex items-center gap-x-3">
						<span>{avgReviewCount || 0}</span>
						<RatingStars reviewCount={avgReviewCount} />
						<span>{course?.ratingAndReview?.length} Ratings</span>
					</div>
					<p>₹ {course?.price}</p>
				</div>
			</Link>
		</div>
	);
};

export default CourseCard;
