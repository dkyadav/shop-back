import mongoose from "mongoose";
import { Role } from "./models/Role.js";
import { User } from "./models/User.js";

export default async function initialize() {
	const roleData = [
		{
			name: "user",
			access: 1,
		},
		{
			name: "seller",
			access: 5,
		},
		{
			name: "admin",
			access: 10,
		},
	];

	mongoose.connection
		.dropCollection("roles")
		.then((res) => {
			console.log(res + "\n-- Role collection dropped");
		})
		.catch((err) => {
			if (err.code === 26)
				console.log("-- Role collection does not exists");
			else throw err;
		});

	await Role.create(roleData)
		.then((result) => {
			//console.log(result + "\n-- Role inserted successfully");
			console.log("Role inserted successfully");
		})
		.catch((err) => {
			console.log(err);
		});

	const userData = [
		{
			email: "user@shop.com",
			password: "abc123",
			cur_role: "user",
		},
		{
			email: "seller@shop.com",
			password: "abc123",
			cur_role: "seller",
		},
		{
			email: "admin@shop.com",
			password: "abc123",
			cur_role: "admin",
		},
	];

	userData.map(async (v, i) => {
		try {
			const { cur_role, ...query } = v;
			const rolefound = await Role.find({ name: v.cur_role });
			let update = { $push: { role: rolefound[0]._id } };
			let options = {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true,
			};
			await User.findOneAndUpdate(query, update, options);
		} catch (error) {
			console.log(error);
		}
	});

	console.log("dummy users created");
}