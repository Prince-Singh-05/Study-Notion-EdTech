import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";

function App() {
	return (
		<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/reset-password" element={<ForgotPassword />} />
				<Route
					path="/reset-password/:id"
					element={<UpdatePassword />}
				/>
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<ContactUs />} />

				{/* Dashboard */}
				<Route
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route
						path="/dashboard/my-profile"
						element={<MyProfile />}
					/>
					<Route
						path="/dashboard/enrolled-courses"
						element={<EnrolledCourses />}
					/>
					<Route path="/dashboard/settings" element={<Settings />} />
					<Route path="/dashboard/cart" element={<Cart />} />

					<Route path="/dashboard/*" element={<NotFound />} />
				</Route>

				{/* Not Found Routes */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
