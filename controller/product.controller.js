import { Product } from "../database/models/Product.js";

export const insertData = async (req, res) => {
	console.log(req.body);
	const productData = new Product(req.body);
	try {
		const prod_ret = await productData.save();
		res.send(prod_ret);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};

export const deleteData = async (req, res) => {
	const pid = req.body._id;
	console.log(pid);
	try {
		const prod_ret = await Product.deleteOne({ _id: pid });
		res.send(prod_ret);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};

export const updateData = async (req, res) => {
	const pid = req.body._id;
	console.log(pid);
	try {
		const prod_ret = await Product.updateOne(
			{ _id: pid },
			{
				name: req.body.name,
				category: req.body.category,
				details: req.body.details,
				quantity: req.body.quantity,
				price: req.body.price,
				extra: req.body.extra,
			}
		);
		res.send(prod_ret);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};

export const findById = async (req, res) => {
	const pid = req.params._id;
	console.log(pid);
	try {
		const prod_res = await Product.findOne({ _id: pid });

		res.send(prod_res);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};

export const findAll = async (req, res) => {
	const pid = req.params._id;
	console.log(pid);
	try {
		const prod_res = await Product
			.find()
			.sort({ quantity: -1 });

		res.send(prod_res);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};

export const searchProds = async (req, res) => {
	try {
		const prod_res = await Product
			.find({ name: { $regex: req.body.name } });
		res.send(prod_res);
	} catch (e) {
		console.error(e);
		res.status(400).send(e.message);
	}
};
