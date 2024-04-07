import mongoose from "mongoose";

export default async function dbconect() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.info("MongoDB has connected successfully.");
		import("./models/Role.js");
		import("./models/User.js");
		import("./models/Product.js");
		console.info("Mongoose models imported");
	} catch (err) {
		console.error("MongoDB connection error :", err);
	}
}

