import { Router } from "express";
import {
	insertData,
	updateData,
	deleteData,
	findById,
	findAll,
	searchProds,
} from "../controller/product.controller.js";

const productroute = Router();

productroute.put("/product", insertData);
productroute.patch("/product", updateData);
productroute.delete("/product", deleteData);
productroute.get("/product/:id", findById);
productroute.get("/allproducts", findAll);

productroute.post("/product", searchProds);

export default productroute;
