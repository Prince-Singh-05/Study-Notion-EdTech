import mongoose from "mongoose";
import {} from "dotenv/config";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("DB connection successful");
	} catch (error) {
		console.log("Error while connecting to database", error.message);
		process.exit(1);
	}
};

export default connectDB;
