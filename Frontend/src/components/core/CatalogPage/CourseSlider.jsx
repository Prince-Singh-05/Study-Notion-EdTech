import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
// import { FreeMode, Pagination } from "swiper";
import CourseCard from "./CourseCard";

const CourseSlider = ({ COURSES, activeTab }) => {
	const [courses, setCourses] = useState(null);

	useEffect(() => {
		if (activeTab === "most_popular") {
			setCourses(COURSES?.most_popular);
		} else if (activeTab === "new") {
			setCourses(COURSES?.new_courses);
		} else {
			setCourses(COURSES);
		}
	}, [activeTab, COURSES]);

	return (
		<div>
			{courses?.length ? (
				<Swiper
					slidesPerView={1}
					loop={true}
					pagination={{
						dynamicBullets: true,
					}}
					spaceBetween={30}
					className="mySwiper"
				>
					{courses.map((course) => (
						<SwiperSlide key={course._id}>
							<CourseCard
								course={course}
								HEIGHT={"h-[100px] lg:h-[400px]"}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p>No Course Found</p>
			)}
		</div>
	);
};

export default CourseSlider;
