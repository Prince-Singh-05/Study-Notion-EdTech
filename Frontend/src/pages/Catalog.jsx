import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import CourseCard from "../components/core/CatalogPage/CourseCard";

const Catalog = () => {
	const { catalogName } = useParams();
	const [catalogPageData, setCatalogPageData] = useState(null);
	const [categoryId, setCategoryId] = useState("");

	const [activeTab, setActiveTab] = useState("most_popular");

	useEffect(() => {
		const fetchCategories = async () => {
			const result = await apiConnector("GET", categories.CATEGORIES_API);

			const category_id = result?.data?.data.filter(
				(ct) =>
					ct.name.split(" ").join("-").toLowerCase() === catalogName
			)[0]._id;

			setCategoryId(category_id);
		};

		fetchCategories();
	}, [catalogName]);

	useEffect(() => {
		const fetchCategoryPageDetails = async () => {
			try {
				const result = await getCatalogPageData(categoryId);
				console.log("CATALOG PAGE DATA", result);
				setCatalogPageData(result);
			} catch (error) {
				console.log(error);
			}
		};

		if (categoryId) fetchCategoryPageDetails();
	}, [categoryId]);

	console.log("CATALOG PAGE DATA", catalogPageData);

	const handleChangeTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className="flex flex-col text-richblack-5 mt-16">
			<div>
				<p>
					{`Home / Catalog / `}{" "}
					<span className="capitalize">
						{catalogPageData?.selectedCategory?.name}
					</span>
				</p>
				<p className="capitalize">
					{catalogPageData?.selectedCategory?.name}
				</p>
				<p>{catalogPageData?.selectedCategory?.description}</p>
			</div>

			<div>
				{/* Section 1 */}
				<div className="flex gap-x-3">
					<div
						onClick={() => handleChangeTab("most_popular")}
						className={`${
							activeTab === "most_popular" ? "text-yellow-50" : ""
						} cursor-pointer`}
					>
						Most Popular
					</div>
					<div
						onClick={() => handleChangeTab("new")}
						className={`${
							activeTab === "new" ? "text-yellow-50" : ""
						} cursor-pointer`}
					>
						New
					</div>
				</div>
				<div>
					<CourseSlider
						COURSES={catalogPageData?.selectedCategoryData}
						activeTab={activeTab}
					/>
				</div>

				{/* Section 2 */}
				<div>
					<p>Top Courses</p>
					<div>
						<CourseSlider
							COURSES={
								catalogPageData?.otherCoursesData
									?.top_selling_courses
							}
						/>
					</div>
				</div>

				{/* Section 3 */}
				<div>
					<p>Frequently Bought</p>
					<div className="py-6">
						<div className="grid grid-cols-1 lg:grid-cols-2">
							{catalogPageData?.selectedCategoryData?.trending_courses
								?.slice(0, 4)
								?.map((course) => (
									<CourseCard
										course={course}
										key={course._id}
										HEIGHT={"h-[100px] lg:h-[400px]"}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Catalog;
