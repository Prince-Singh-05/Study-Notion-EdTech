import express from "express";
import {} from "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import cors from "cors";
import connectDB from "./config/database";
import fileUpload from "express-fileupload";

import userRouter from "./routes/user.routes";
import profileRouter from "./routes/profile.routes";
import paymentRouter from "./routes/payment.routes";
import courseRouter from "./routes/course.routes";

const PORT = process.env.PORT ?? 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser);
app.use(
	cors({
		origin: "http:localhost:3000",
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/temp",
	})
);

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/paymnet", paymentRouter);

// default route
app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Server is up and running....",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
