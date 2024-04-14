import { Router } from "express";
import {
	insertData,
	updateData,
	deleteData,
	findById,
	findAll,
	searchProds,
	findAllAdmin,
} from "../controller/product.controller.js";
import { signin, verify_jwt } from '../controller/auth.controller.js';

const productroute = Router();

productroute.put("/product",verify_jwt, insertData);
productroute.patch("/product",verify_jwt, updateData);
productroute.delete("/product",verify_jwt, deleteData);
productroute.get("/product/:id", findById);
productroute.get("/allproducts", findAll);

productroute.get("/admin/allproducts/:pid?", verify_jwt, findAllAdmin);
//productroute.get("/admin/allproducts/?:pid", verify_jwt, findAllAdmin);

productroute.post("/product", searchProds);

export default productroute;
