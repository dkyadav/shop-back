import mongoose from "mongoose";
import bcrypt from "bcrypt";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	details: {
		type: String,
	},
	quantity: {
		type: Number,
		required: true,
		default: 0,
	},
	size: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	extra: {
		type: Object,
	},
	img_big_url:{
		type: String,
	},
	img_small_url:{
		type: String,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	insert: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
