import { Role } from "../database/models/Role.js";
import { User } from "../database/models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

export const register = async (req, res) => {
	console.log(req.body);
	const getRole = await Role.find({ name: req.body.role });
	req.body.role = getRole[0]._id;
	const userData = new User(req.body);
	try {
		const prod_ret = await userData.save();
		console.log(prod_ret);
		const token_generate = jwt.sign(
			{
				email: req.body.email,
				name: req.body.name,
				_id: prod_ret._id,
			},
			JWT_SECRET,
			{
				expiresIn: "24h", //24 hours, in sec, if used under string then milisecs
			}
		);

		res.status(200).send({ token: token_generate });

		//res.send(prod_ret);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}

	//res.send("got it");
};

export const get_user = async (req, res) => {
	const user_res = await User.findOne({
		_id: req._id,
	});

	try {
		//const add_ret = await userdata.save();
		res.send(user_res);
	} catch (error) {
		console.error(error);
		res.status(400).send(error.message);
	}
};
