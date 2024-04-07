import express from "express";
import dotenv from "dotenv";
dotenv.config();

import dbconect from './database/connect.js';
dbconect();
import initialize from "./database/initialize.js";
initialize();

import userRoute from "./routes/user.route.js";



const app = express();
app.use(express.json());

app.use(userRoute);

app.get("/", (req, res) => res.send({"health":"OK"}));

app.listen(process.env.SERVER_PORT, () => {
	console.log(`server running on ${process.env.SERVER_PORT}`);
});
