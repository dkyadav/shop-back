import { User } from "../database/models/User.js";

export const register = async (req, res) => {
	console.log(req.body);

	const userData = new User(req.body);
	//console.log(productData);
	try {
		const prod_ret = await userData.save();
		res.send(prod_ret);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}

	//res.send("got it");
};
