import mongoose from "mongoose";

export default async function dbconect() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.info("MongoDB has connected successfully.");
		
		console.info("Mongoose models imported");
	} catch (err) {
		console.error("MongoDB connection error :", err);
	}
}

