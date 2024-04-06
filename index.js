import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send({"health":"OK"}));

app.listen(process.env.SERVER_PORT, () => {
	console.log(`server running on ${process.env.SERVER_PORT}`);
});
