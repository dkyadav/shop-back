import { Router } from "express";
import { get_user, register } from "../controller/user.controller.js";
import { signin, verify_jwt } from "../controller/auth.controller.js";
import { LoginValidation } from "../utils/user.validator.js";
import { RegisterValidation } from "../utils/register.validator.js";

const userRoute = Router();

userRoute.post("/register", RegisterValidation, register);
userRoute.post("/signin", LoginValidation, signin);
//userRoute.post("/signin", signin);
userRoute.get("/profile", verify_jwt, get_user);

export default userRoute;
