import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import SubSectionModal from "./SubSectionModal";
import { AiOutlinePlus } from "react-icons/ai";
import {
	deleteSection,
	deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const NestedView = ({ handleChangeEditSectionName }) => {
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [addSubSection, setAddSubSection] = useState(null);
	const [viewSubSection, setViewSubSection] = useState(null);
	const [editSubSection, setEditSubSection] = useState(null);

	const [confirmationModal, setConfirmationModal] = useState(null);

	const handleDeleteSection = async (sectionId) => {
		const result = await deleteSection(
			{
				sectionId,
				courseId: course._id,
			},
			token
		);

		if (result) {
			dispatch(setCourse(result));
		}
		setConfirmationModal(null);
	};

	const handleDeleteSubSection = async (subSectionId, sectionId) => {
		const result = await deleteSubSection({
			subSectionId,
			sectionId,
			token,
		});

		if (result) {
			dispatch(setCourse(result));
		}

		setConfirmationModal(null);
	};

	return (
		<div>
			<div className="flex flex-col gap-4 rounded-lg bg-richblack-700 py-6 px-8">
				{course?.courseContent?.map((section) => (
					<details
						key={section._id}
						open
						className="flex flex-col gap-2"
					>
						<summary className="flex items-center justify-between gap-x-3 border-b-2 cursor-pointer">
							<div className="flex items-center gap-x-3">
								<RxDropdownMenu />
								<p>{section.sectionName}</p>
							</div>
							<div className="flex items-center gap-x-3">
								<button
									onClick={() =>
										handleChangeEditSectionName(
											section._id,
											section.sectionName
										)
									}
								>
									<MdEdit />
								</button>
								<button
									onClick={() =>
										setConfirmationModal({
											text1: "Delete Section",
											text2: "All the lectures in this section will be deleted",
											btn1Text: "Delete",
											btn2Text: "Cancel",
											btn1Handler: () =>
												handleDeleteSection(
													section._id
												),
											btn2Handler: () =>
												setConfirmationModal(null),
										})
									}
								>
									<RiDeleteBin6Line />
								</button>
								<span>|</span>
								<BiSolidDownArrow />
							</div>
						</summary>

						<div className="flex flex-col gap-2">
							{section.subSections.map((subSection) => (
								<div
									key={subSection._id}
									className="flex items-center justify-between ml-6 gap-x-3 border-b-2"
								>
									<div
										onClick={() =>
											setViewSubSection(subSection)
										}
										className="flex items-center gap-x-3 cursor-pointer"
									>
										<RxDropdownMenu />
										<p>{subSection.title}</p>
									</div>

									<div className="flex items-center gap-x-3">
										<button
											onClick={() =>
												setEditSubSection({
													...subSection,
													sectionId: section._id,
												})
											}
										>
											<MdEdit />
										</button>
										<button
											onClick={() =>
												setConfirmationModal({
													text1: "Delete this Sub-Section",
													text2: "Selected Lecture will be deleted",
													btn1Text: "Delete",
													btn2Text: "Cancel",
													btn1Handler: () =>
														handleDeleteSubSection(
															subSection._id,
															section._id
														),
													btn2Handler: () =>
														setConfirmationModal(
															null
														),
												})
											}
										>
											<RiDeleteBin6Line />
										</button>
									</div>
								</div>
							))}
							<button
								onClick={() => setAddSubSection(section._id)}
								className="flex items-center gap-3 text-yellow-100 ml-6 max-w-max"
							>
								<AiOutlinePlus />
								<p>Add Lecture</p>
							</button>
						</div>
					</details>
				))}
			</div>

			{addSubSection ? (
				<SubSectionModal
					modalData={addSubSection}
					setModalData={setAddSubSection}
					add={true}
				/>
			) : viewSubSection ? (
				<SubSectionModal
					modalData={viewSubSection}
					setModalData={setViewSubSection}
					view={true}
				/>
			) : editSubSection ? (
				<SubSectionModal
					modalData={editSubSection}
					setModalData={setEditSubSection}
					edit={true}
				/>
			) : null}

			{confirmationModal ? (
				<ConfirmationModal modalData={confirmationModal} />
			) : null}
		</div>
	);
};

export default NestedView;
