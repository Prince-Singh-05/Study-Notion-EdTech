import express from "express";
import {} from "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import fileUpload from "express-fileupload";

import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import courseRouter from "./routes/course.routes.js";
import { contactUsRouter } from "./routes/contact.routes.js";

const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "https://studynotion24.vercel.app/"],
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/temp",
	})
);

// routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/paymnet", paymentRouter);
app.use("/api/v1/reach", contactUsRouter);

// default route
app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Server is up and running....",
	});
});

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

export default app;
