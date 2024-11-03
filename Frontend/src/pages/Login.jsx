import Template from "../components/core/Auth/Template.jsx";
import loginImg from "../assets/Images/login.webp";
import InstructorLogin from "../assets/Images/InstructorLogin.jpg";

const Login = () => {
	return (
		<Template
			title={"Welcome Back"}
			desc1={"Build skills for today, tomorrow, and beyond."}
			desc2={"Education to future-proof your career."}
			imageStudent={loginImg}
			imageInstructor={InstructorLogin}
			formType={"login"}
		/>
	);
};

export default Login;
