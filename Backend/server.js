import express from "express";
import {} from "dotenv/config";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? 4000;
const app = express();

app.use(express.json());
app.use(cookieParser);

// routes

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
