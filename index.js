import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dbconect from './database/connect.js';
dbconect();
import initialize from "./database/initialize.js";
initialize();

import userRoute from "./routes/user.route.js";
import productroute from "./routes/product.route.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use(productroute);

app.get("/", (req, res) => res.send({"health":"OK","Date":new Date()}));

app.listen(process.env.PORT, () => {
	console.log(`server running on ${process.env.PORT}`);
});
