import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	role: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role",
		},
	],
	insert: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
	const user = this;
	//console.log(user);
	if (!user.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (error) {
		console.error(error);
		return next(error);
	}
});

userSchema.methods.comparePassword = async (password) => {
	console.log(password);
	console.log(this.password);
	return bcrypt.compare(password, this.password);
};

userSchema.methods.matchPassword = async (password1,password2) => {
	console.log(password1);
	console.log(password2);
	return bcrypt.compare(password1, password2);
};

export const User = mongoose.model("User", userSchema);
