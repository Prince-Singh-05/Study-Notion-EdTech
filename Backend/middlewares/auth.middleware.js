import jwt from "jsonwebtoken";
import {} from "dotenv/config";

// authentication
const auth = async (req, res, next) => {
	try {
		// get token from cookie, authorization header or request's body
		const token =
			req.cookies.token ||
			req.header("Authorization").replace("Bearer ", "") ||
			req.body.token;

		if (!token) {
			return res.status(403).json({
				success: false,
				message: "token not found",
			});
		}

		// verify the token with secret
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		if (!decodedToken) {
			return res.status(401).json({
				success: false,
				message: "token not verified",
			});
		}

		req.user = decodedToken;

		// call next()
		next();
	} catch (error) {
		return res.status(401).json({
			success: true,
			message:
				"Error in auth middleware, user verification unsuccessful" +
				` ${error.message}`,
		});
	}
};

// isStudent
const isStudent = async (req, res, next) => {
	try {
		// get data from req.user
		const { accountType } = req.user;

		// check if the accountType is "student"
		if (accountType.toLowerCase() !== "student") {
			return res.status(403).json({
				success: false,
				message: "Please signin as a student profile, or create one :)",
			});
		}

		// if yes, call next()
		next();
	} catch (error) {
		console.log(error.message);
		return res.status(403).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

// isInstructor
const isInstructor = async (req, res, next) => {
	try {
		// get data from req.user
		const { accountType } = req.user;

		// check if the accountType is "instructor"
		if (accountType.toLowerCase() !== "instructor") {
			return res.status(403).json({
				success: false,
				message:
					"Please signin as a instructor profile, or create one :)",
			});
		}

		// if yes, call next()
		next();
	} catch (error) {
		console.log(error.message);
		return res.status(403).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

// isAdmin
const isAdmin = async (req, res, next) => {
	try {
		// get data from req.user
		const { accountType } = req.user;

		// check if the accountType is "admin"
		if (accountType.toLowerCase() !== "admin") {
			return res.status(403).json({
				success: false,
				message: "This route is protected for Admins only",
			});
		}

		// if yes, call next()
		next();
	} catch (error) {
		console.log(error.message);
		return res.status(403).json({
			success: false,
			message: "User role cannot be verified, please try again",
		});
	}
};

export { auth, isStudent, isInstructor, isAdmin };
