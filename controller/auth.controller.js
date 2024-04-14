import { User } from "../database/models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

export async function signin(req, res, next) {
	try {
		const user_res = await User.findOne({
			email: req.body.email,
		});

		if (!user_res) res.status(403).send("username/Email not found!");
		else {
			const pwdcom = await user_res.matchPassword(
				req.body.password,
				user_res.password
			);

			//user_res.password != req.body.password
			if (!pwdcom) res.status(403).send("password incorrect!");
			else {
				const token_generate = jwt.sign(
					{
						email: user_res.email,
						name: user_res.name,
						_id: user_res._id,
					},
					JWT_SECRET,
					{
						expiresIn: "24h", //24 hours, in sec, if used under string then milisecs
					}
				);

				res.status(200).send({ token: token_generate });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
}

export async function verify_jwt(req, res, next) {
	let token =
		req.headers["x-access-token"] || req.headers.authorization
			? req.headers.authorization.split(" ")[1]
			: null;

	if (!token) res.status(403).send({ message: "No token sent in header" });
	else {
		try {
			const token_verified = jwt.verify(token, JWT_SECRET);
			req._id = token_verified._id;
			console.log("token_verified");

			next();
		} catch (error) {
			console.error(error);
			console.log(error.stack);
			res.status(400).send({
				"Auth Error details": error,
			});
		}
	}
}
