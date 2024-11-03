import React from "react";
import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/signup.webp";
import InstructorSignup from "../assets/Images/InstructorSignup.jpg";

const Signup = () => {
	return (
		<Template
			title={
				"Join the millions learning to code with StudyNotion for free."
			}
			desc1={"Build skills for today, tomorrow, and beyond."}
			desc2={"Education to future-proof your career."}
			imageStudent={signupImg}
			imageInstructor={InstructorSignup}
			formType={"signup"}
		/>
	);
};

export default Signup;
